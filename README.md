# a320-hydraulics-frontend-demo

A repository for the deliverables of the Frontend portion of the Test Task: Full Stack Development JS/TS

## Test Task: Full Stack Development JS/TS

### Full Stack Development of Airbus Hydraulic System Simulation using Microsoft Flight Simulator 2020 SDK

#### Objective

Develop a frontend application to simulate and visualize the hydraulic system of an Airbus aircraft. The simulation should leverage the Microsoft Flight Simulator 2020 SDK to fetch and manipulate data, providing a realistic simulation environment.

For additional merit you can create a full-stack development with custom backend development, but this is not essential.

#### **Project Scope:**

1. **Frontend Development (TypeScript, React or Angular):**
   - Develop a user interface that allows users to interact with the Airbus hydraulic system.
   - The UI should provide real-time visualization of hydraulic pressures, fluid levels, and system status using a cockpit-like dashboard.
   - Include features like starting and stopping the simulation, controlling hydraulic pumps, and showing warnings for system malfunctions.
   - The UI should be responsive and user-friendly, with a focus on providing a realistic simulation experience.
2. **Backend Development (Java, Spring Boot) (not essential):**
   - Develop a backend API to handle business logic and communicate with the Microsoft Flight Simulator 2020 SDK.
   - The backend should manage simulation states, perform calculations related to hydraulic dynamics, and store system states.
   - The API should expose endpoints to:
     - Start and stop the simulation.
     - Fetch current hydraulic system status.
     - Trigger hydraulic system failures or malfunctions for testing purposes.
   - Ensure robust error handling and logging.
3. **Integration with Microsoft Flight Simulator 2020 SDK:**
   - Utilize the Microsoft Flight Simulator 2020 SDK to fetch real-time flight data (altitude, speed, etc.) and manipulate the Airbus aircraft's hydraulic system.
   - Create a module that interacts with the SDK to simulate hydraulic pressure changes based on flight conditions and user input.
   - Simulate various hydraulic system behaviors such as fluid leakages, pump failures, and different pressure scenarios.
   - Ensure smooth and reliable communication between the application and the Flight Simulator SDK.
4. **Database (PostgreSQL or MySQL):**
   - Set up a database to store historical simulation data, including hydraulic system states, user actions, and system failures.
   - Implement APIs to query historical data for analytics and reporting purposes.
5. **Testing:**
   - Write unit tests for both backend and frontend components to ensure robustness and reliability.
   - Include integration tests to verify proper communication between the backend API and the Microsoft Flight Simulator SDK.
   - Perform end-to-end testing to ensure the full system operates as expected.
6. **Documentation:**
   - Provide comprehensive documentation covering the setup and installation of the project, API usage, and architecture overview.
   - Include a README file with instructions on how to run the application locally and deploy it on a server.

#### **Deliverables:**

1. **Source Code:** A GitHub repository containing all source code for both frontend and backend components.
2. **Deployment:** A Docker Compose file or equivalent scripts to set up and run the entire system locally.
3. **Documentation:** Detailed documentation for setting up and using the system.
4. **Demo:** A video or a live demo showcasing the working application, demonstrating key features like real-time data visualization, system control, and SDK integration.

#### **Evaluation Criteria:**

1. **Code Quality:** Clean, modular, and maintainable code.
2. **Architecture:** Well-structured architecture that separates concerns and ensures scalability.
3. **Functionality:** Proper implementation of all required features, including SDK integration and data visualization.
4. **Testing:** Comprehensive test coverage with well-written unit and integration tests.
5. **Documentation:** Clear and comprehensive documentation that explains the system design and usage.
6. **User Experience:** Intuitive and responsive UI that offers a realistic simulation experience.

#### **Time Estimation:**

This task is expected to take approximately 20-30 hours of work, assuming familiarity with the required technologies and the Microsoft Flight Simulator SDK.

#### **Notes:**

- Access to Microsoft Flight Simulator 2020 and its SDK will be necessary to complete this task.
- The applicant should demonstrate both technical skills and creativity in approaching the problem.

#### Resources

- [AviaLearn Hydraulic System Presentation A320 Family](https://youtu.be/o2dJM9UNFqw?si=xzwAbIatnkLzQwzL)
- [Microsoft Flight Simulator 2020 SDK Documentation](https://docs.flightsimulator.com/html/Introduction/Introduction.htm)
