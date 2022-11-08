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
