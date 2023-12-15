import subprocess

# Start Flask
subprocess.Popen(['python', 'app.py'])

# Start Celery
subprocess.Popen(['celery', '-A', 'tasks', 'worker', '--loglevel=info'])
