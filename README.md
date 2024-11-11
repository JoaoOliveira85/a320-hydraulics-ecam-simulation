# a320-hydraulics-frontend-demo

A repository for the deliverables of the Frontend portion of the Test Task: Full Stack Development JS/TS

## Project Overview

This project simulates the hydraulics system of an A320 aircraft, providing an interactive frontend for educational and demonstration purposes.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (version 27 or higher)

## Installation Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/joaooliveira85/a320-hydraulics-frontend-demo.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd a320-hydraulics-frontend-demo
   ```

3. **Build the Docker Image**

   ```bash
   docker compose up --build
   ```

4. **Access the Application**

   Open your browser and navigate to [http://localhost:2019](http://localhost:2019)

## Usage

## **Usage Instructions**

After successfully setting up and running the application (see the Installation Instructions), you can access and interact with the simulation through your web browser.

### **Accessing the Application**

- **Default Mode:** Open your browser and navigate to `http://localhost:2019/`.
- **Cockpit Mode:** Navigate to `http://localhost:2019/cockpit`.

---

### **Application Modes**

#### **1. Default Mode (`http://localhost:2019/`)**

This is the primary interface of the application, offering a full-featured simulation experience. The interface is responsive and consists of two main sections:

- **ECAM Display (Left Side):** An image of the Electronic Centralized Aircraft Monitor (ECAM) that reflects the real-time state of the aircraft's hydraulic systems.
- **Control Panels (Right Side):** A set of interactive panels that allow you to manipulate the simulation.

**Key Components:**

##### **a. Overhead Panel**

- **Pumps Control:** Toggle all engine and electric pumps on or off.
- **Engine Fire Valves:** Open or close the engine fire valves.
- **Power Transfer Units (PTUs):** Activate or deactivate the PTUs.
- **Real-Time Updates:** Any changes here are immediately reflected on the ECAM display, allowing you to see the impact of your actions on the hydraulic systems.

##### **b. Simulation Controls**

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

##### **c. Real-Time Data**

- **Data Table:** View a continuously updating table that displays key data points from the simulation, such as pressure readings, flow rates, and system statuses.
- **Monitoring:** Use this data to monitor the health and performance of the hydraulic systems as you interact with the simulation.

##### **d. Failures Panel**

- **Simulate Failures:** Introduce system failures to test how the hydraulic systems respond under adverse conditions:
  - **Line Leaks:** Simulate hydraulic line leaks to observe pressure drops and fluid loss.
  - **Pump Failures:** Trigger failures of specific pumps to see how the system compensates.
- **Analysis:** Observe the immediate effects on the ECAM display and real-time data, enhancing your understanding of system redundancies and failure management.

---

#### **2. Cockpit Mode (`http://localhost:2019/cockpit`)**

This mode provides a focused simulation experience with a simplified interface:

- **Full-Screen Cockpit View:** The cockpit occupies the entire browser window, offering an immersive environment.
- **Essential Controls:** Includes a select set of instruments from the overhead panel to control critical functions like pumps and valves.
- **Real-Time ECAM Integration:** Interactions within the cockpit mode still reflect real-time changes on the ECAM display embedded in the cockpit interface.

---

### **Interacting with the Simulation**

- **Toggle Switches and Buttons:**
  - Click on switches or buttons in the Overhead Panel to control pumps, valves, and PTUs.
- **Adjust Simulation Parameters:**
  - Use input fields and sliders in the Simulation Controls panel to fine-tune settings.
  - Input numerical values or use predefined options where available.
- **Monitor Outputs:**
  - Keep an eye on the ECAM display to see graphical representations of system statuses.
  - Refer to the Real-Time Data table for precise numerical data and system indicators.
- **Simulate Failures:**
  - In the Failures panel, select the type of failure you want to simulate.
  - Observe how the system responds, both visually on the ECAM and numerically in the data table.
- **Control the Simulation Flow:**
  - Use the Start, Stop, and Reset buttons to manage the simulation's progression.
  - Experiment with different scenarios by adjusting parameters and introducing failures.

---

### **Tips for Effective Use**

- **Explore System Interactions:**
  - Experiment with turning different pumps on and off to see how they affect system pressure and flow.
  - Use the PTUs to understand how power is transferred between hydraulic systems.
- **Understand Failure Modes:**
  - Simulate line leaks to observe how the system detects and manages fluid loss.
  - Trigger pump failures to see how redundant systems compensate for component losses.
- **Optimize Simulation Settings:**
  - Adjust the simulation speed to slow down complex interactions for better analysis.
  - Modify air temperature to see its effect on system performance, especially under extreme conditions.
- **Utilize Real-Time Data:**
  - Monitor the data table to track changes over time and correlate them with your actions.
  - Use the data to validate system behavior and understand underlying mechanics.
- **Responsive Design:**
  - While the application is responsive and can be used on various devices, a larger screen (desktop or laptop) is recommended for the best experience.
  - Ensure your browser window is maximized to fully appreciate the interface layout and details.

---

### **Troubleshooting**

- **Port Conflict:** Ensure that port 2019 is not in use by another application.
- **Docker Issues:** If you encounter Docker-related errors, try restarting Docker or running the commands with elevated privileges.
- \*_Build Failures:_ Run `docker compose down --rmi all` to remove images and try rebuilding.

---

### **NPM Scripts**

The project includes several npm scripts to assist with development, testing, and deployment. Below is a list of the main scripts available in the package.json file (requires Node.js version 20 or higher and NPM version 10 or higher):

- dev: Runs the application in development mode using Vite.

```bash
npm run dev
```

- build: Compiles TypeScript and builds the application for production.

```bash
npm run build
```

- preview: Serves the production build locally for previewing the application.

```bash
npm run preview
```

- docker:up: Starts the Docker containers.

```bash
npm run docker:up
```

- docker:build: Builds the Docker images.

```bash
npm run docker:build
```

- docker:down: Stops and removes the Docker containers.

```bash
npm run docker:down
```

- lint: Runs ESLint to analyze code for potential errors and code quality issues.

```bash
npm run lint
```

- lint:fix: Runs ESLint and automatically fixes fixable problems.

```bash
npm run lint:fix
```

- format:write: Formats code using Prettier and writes changes to the files.

```bash
npm run format:write
```

- format:check: Checks code formatting with Prettier without modifying any files.

```bash
npm run format:check
```

- nvm-use: Changes the Node.js version using a PowerShell script. This is useful if you manage multiple Node.js versions with NVM.

```bash
npm run nvm-use
```

- test: Runs tests using Vitest and generates coverage reports.

```bash
npm run test
```

- prepare: Installs Husky Git hooks. This script is automatically run when you install dependencies.

```bash
npm run prepare
```

- pre-commit: Runs linting and formatting scripts before committing code. This helps maintain code quality.

```bash
npm run pre-commit
```

---

### **Conclusion**

This application offers an interactive way to explore and understand the hydraulics system of an A320 aircraft. By engaging with the controls and observing the immediate effects on the system, you can gain valuable insights into aircraft operations, system dependencies, and failure management.

Feel free to experiment with different settings and scenarios to fully leverage the capabilities of the simulation.

---

**Note:** If you encounter any issues or have questions about specific functionalities, please refer to the Troubleshooting section or contact the support team.

## Contact Information

- **Name:** João Oliveira
- **Email:** <jpvfo42@gmail.com>
- **GitHub:** [joaooliveira85](http://www.github.com/joaooliveira85)
