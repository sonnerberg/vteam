# How to use this repository

## How to get started with pre-commit

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

## Getting started with docker images

1. Start the docker images

    ```bash
    docker-compose up --build
    ```

1. With the images running they are access by:

   * [FastAPI](http://localhost:80)
   * [Express](http://localhost:81)
   * The address of `mariadb` can be found by running

     ```bash
     docker inspect -f \
     '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mariadb
     ```

     You can then connect to `mariadb` by running (change ip number accordingly):

     ```bash
     mysql -h 172.21.0.5 -P 3306 --user=user --password
     ```

     The password for the user `user` is specified in `docker-compose.yml`

   * The address of `mongodb` can be found by running

     ```bash
     docker inspect -f \
     '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mongodb
     ```

     You can then connect to `mongodb` by running (change ip number accordingly):

     ```bash
     mongosh --host 172.21.0.3 --username root --password
     ```

     The password for the user `root` is specified in `docker-compose.yml`

   * The address of `postgres` can be found by running

     ```bash
     docker inspect -f \
     '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' postgres
     ```

     You can then connect to `postgres` by running (change ip number accordingly):

     ```bash
     psql -h 172.21.0.4 -p 5432 -U postgres
     ```

     The password for the user `postgres` is specified in `docker-compose.yml`
