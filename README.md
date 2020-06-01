# Image-Classification-React-App

The **Image-Classification-React-App** was a simple project with the intuition of developing experience where web applications and Machine Learning meet. A simple UI done in React allows the user to uplod an image, which, when uploaded to the underlying flask app, runs a prediction on a trained residual neural network ([ResNet](https://keras.io/applications/#resnet)).

## Getting Started

To start, clone the present repository into your local machine. If you're unaware of how to achieve this, you can familiarise yourself with the mechanisms of [GitHub](https://help.github.com/articles/set-up-git) repositories in the provided link.

```
git clone git@github.com:thyriki/Image-Classification-React-App.git
```
### Prerequisites
Ensure that you have [Node 10.4.1](https://nodejs.org/en/), [yarn](https://yarnpkg.com/lang/en/) and [React](https://reactjs.org/) installed and properly set up.

## Instructions

Start by opening a terminal, and navigate to the project's folder.

### React App
 To initialise the **React** app on port *3000*:

```
cd ui/
npm install -g serve
npm run build
serve -s build -l 3000
```

### Flask Web App
To initialise the **Flask** web app:

```
cd service/
virtualenv -p Python3 .
source bin/activate
pip install -r requirements.txt
FLASK_APP=app.py flask run
```

### Framework

This repo was developed while using this amazing [framework](https://towardsdatascience.com/create-a-complete-machine-learning-web-application-using-react-and-flask-859340bddb33) as its foundation!

## Authors

* **Ricardo Soares** - [rmssoares](https://github.com/rmssoares)
* **Biagio Antonelli**  - [BiagioAntonelli](https://github.com/BiagioAntonelli)

For any inquiries, feel free to open up an issue.
