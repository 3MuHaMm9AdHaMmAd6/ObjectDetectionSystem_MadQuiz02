# Project README

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
