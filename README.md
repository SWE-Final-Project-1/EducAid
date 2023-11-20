# EducAid Project Setup

## Getting Started

### Prerequisites

- Node.js and npm (https://nodejs.org/)
- Python (https://www.python.org/)
- Yarn or npm (Yarn recommended for the frontend)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/SWE-Final-Project-1/EducAid.git 
    ```
2. Navigate to the root of the cloned directory

    ```bash
    cd EducAid 
    ```

2. Navigate to the client directory:

    ```bash
    cd client
    ```

3. Install frontend dependencies using Yarn or npm:

    ```bash
    yarn install
    # or
    npm install
    ```

4. Navigate to the server directory:

    ```bash
    cd ../server
    ```

5. Install backend dependencies:

    ```bash
    pip install -r requirements.txt
    ```

### Development Workflow

1. **Create a New Branch for Your Feature**

    ```bash
    git checkout -b feature/your-feature-name
    ```

2. **Work on Your Feature**

    Make your changes, add, commit, and push to your branch.

    ```bash
    git add .
    git commit -m "Feature: Your feature description"
    git push origin feature/your-feature-name
    ```

3. **Create a Pull Request (PR)**

    Create a new pull request on GitHub using the development branch as the base branch.

4. **Review and Merge**

    Collaborate with your team to review the changes, and once approved, merge the PR.

### Running the Application

1. **Start the Frontend (in client directory)**

    ```bash
    yarn dev
    # or
    npm run dev
    ```

    This will start the development server for the frontend.

2. **Start the Backend (in server directory)**

    ```bash
    flask run
    ```

    This will start the Flask development server for the backend.

3. **Open the Application**

    Open your browser and go to http://localhost:5173 to view the frontend.


Happy coding!