# How to get started

1. Check your python version (you need 3.8 or higher)

    ```bash
    python3.9 --version
    Python 3.9.2
    ```

1. Create a virtual environment for python

    ```bash
    python3.9 -m venv .venv
    ```

1. Activate the virtual environment

    ```bash
    source .venv/bin/activate
    ```

1. Upgrade pip in the virtual environment

    ```bash
    pip install --upgrade pip
    ```

1. Install pre-commit dependencies (with the virtual environment activated)

    ```bash
    pip install pre-commit gitlint pymarkdown
    ```

1. Install pre-commit hooks (with the virtual environment activated)

    ```bash
    pre-commit install
    ```

1. From now on the pre-commit hooks will run after a commit. You do not have to
have the virtual environment activated as the path to python in the virtual
environment has been saved in the pre-commit hook in the `.git` folder.
Here is an example of the expected output while making a commit to the repository:

    ```bash
    (.venv) ❱ git commit -m "Add final instruction"
    trim trailing whitespace.................................................Passed
    fix end of files.........................................................Passed
    check yaml...........................................(no files to check)Skipped
    check for added large files..............................................Passed
    PyMarkdown...............................................................Passed
    ```
