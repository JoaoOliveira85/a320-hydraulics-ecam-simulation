# a320-hydraulics-ecam-simulation

An interactive simulation of the Airbus A320 hydraulic system. Operate the overhead
panel, inject failures, and watch the ECAM hydraulic page respond in real time.

Built with React, TypeScript, MUI and Vite. The simulation runs in a Web Worker.

## Run it

Requires [Docker](https://docs.docker.com/get-docker/) 27 or newer.

```bash
git clone https://github.com/JoaoOliveira85/a320-hydraulics-ecam-simulation.git
cd a320-hydraulics-ecam-simulation
docker compose up --build
```

Then open <http://localhost:2019>.

To run without Docker you need Node 20+ (see `.nvmrc`) and npm 10+:

```bash
npm ci
npm run dev
```

## What's in it

Two views:

- `/` — the ECAM display next to the control panels:
  - **Overhead panel:** engine and electric pumps, engine fire valves, PTU.
  - **Simulation controls:** starting conditions, reservoir levels, pump flow rates,
    line pressure, air temperature, simulation speed, start/pause/reset.
  - **Real-time data:** a live table of pressures, flows and statuses.
  - **Failures:** pump failures and line leaks, to see how the green, blue and yellow
    systems compensate.
- `/cockpit` — a full-window cockpit view with a reduced set of overhead controls and
  the ECAM embedded.

## Development

| Script                                  | What it does                    |
| --------------------------------------- | ------------------------------- |
| `npm run dev`                           | Vite dev server                 |
| `npm run build`                         | Type-check and production build |
| `npm run preview`                       | Serve the production build      |
| `npm test`                              | Vitest with coverage            |
| `npm run lint` / `npm run lint:fix`     | ESLint                          |
| `npm run format:check` / `format:write` | Prettier                        |
| `npm run docker:up` / `build` / `down`  | Docker Compose shortcuts        |

Husky runs lint and a format check before each commit; CI runs lint, format, tests and a
build on every push to `main` and on pull requests.

If the Docker build misbehaves, `docker compose down --rmi all` and rebuild. If the app
doesn't load, check that port 2019 is free.

## Key Components

### **a. Overhead Panel**

- **Pumps Control:** Toggle all engine and electric pumps on or off.
- **Engine Fire Valves:** Open or close the engine fire valves.
- **Power Transfer Units (PTUs):** Activate or deactivate the PTUs.
- **Real-Time Updates:** Any changes here are immediately reflected on the ECAM display, allowing you to see the impact of your actions on the hydraulic systems.

### **b. Simulation Controls**

- **Fine-Tuning Parameters:** Adjust various aspects of the simulation to customize your experience:
  - **Starting Conditions:** Set initial states for different components.
  - **Reservoir Levels:** Modify the hydraulic fluid levels in each reservoir.
  - **Pump Flow Rates:** Change the maximum flow rates of the pumps.
  - **Line Pressure:** Adjust the pressure within the hydraulic lines.
  - **Air Temperature:** Set the ambient air temperature affecting system performance.
  - **Simulation Speed:** Control the speed at which the simulation runs.
- **Simulation Management:**
  - **Start/Stop Simulation:** Begin or pause the simulation at any time.
  - **Reset Simulation:** Restore all settings to their default values and restart the simulation.

### **c. Real-Time Data**

- **Data Table:** View a continuously updating table that displays key data points from the simulation, such as pressure readings, flow rates, and system statuses.
- **Monitoring:** Use this data to monitor the health and performance of the hydraulic systems as you interact with the simulation.

### **d. Failures Panel**

- **Simulate Failures:** Introduce system failures to test how the hydraulic systems respond under adverse conditions:
  - **Line Leaks:** Simulate hydraulic line leaks to observe pressure drops and fluid loss.
  - **Pump Failures:** Trigger failures of specific pumps to see how the system compensates.
- **Analysis:** Observe the immediate effects on the ECAM display and real-time data, enhancing your understanding of system redundancies and failure management.

---

## Notes

Re-imported into a fresh repository in September 2026 to drop committed build output,
third-party assets and some other content, so the repository creation date and the `(#NN)` references in the 2024 commit messages don't line up with the commit dates.

Known gaps:

- The ECAM draw routine is one long `useEffect` that should be split per system.
- Component tests lean on snapshots rather than behaviour.
- The simulation worker has only a couple of tests (pressure drop under PTU/RAT).
- The cockpit background image is 3 MB and isn't lazy-loaded.

## License

[MIT](LICENSE) for the code. The images in `src/assets/` are the author's own screenshots
from a flight simulator and are not covered by it.
