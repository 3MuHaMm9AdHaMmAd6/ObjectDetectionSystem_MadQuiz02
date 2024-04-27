# Project README

## Prerequisites

This project assumes that you have already created an Expo app using `npx expo create-expo-app <project-name>`. If you haven't done this yet, please follow these steps before proceeding further:

1. **Create Expo App**:
   - Run the following command in your terminal or command prompt:
     ```
     npx expo create-expo-app <project-name>
     ```
   Replace `<project-name>` with the desired name for your Expo project.

   This command will set up a new Expo project with the necessary files and dependencies.

## Package Management Instructions

If you have a `package-lock.json` file in your project, follow these steps:

1. **Delete the `package-lock.json` file**:
   - Run the following command in your terminal or command prompt:
     ```
     rm package-lock.json
     ```

2. **Recreate the lock file using Yarn**:
   - After deleting `package-lock.json`, run the following command to generate a `yarn.lock` file:
     ```
     yarn install
     ```

   This command will recreate the lock file based on the dependencies specified in `package.json`.

## Additional Notes

- Make sure you have Yarn installed globally on your system. If not, you can install it via npm by running:
     ```
     yarn install
     ```
- For a seamless experience, ensure the following:
1. **Good Internet Connection**:
   - Make sure you have a stable and reliable internet connection to avoid disruptions during development and testing.

2. **Devices on the Same Network**:
   - Preferably, the mobile device you use for testing should be connected to the same network as your development machine to facilitate smooth communication between the two.

- To start the Expo development server and generate a QR code:
- Run the following command in your terminal or command prompt:
  ```
  npx expo start
  ```
- Scan the generated QR code with your mobile device using the Expo Go app to open the project on your device.
