const path = require('path');
const express = require('express')

exports.serveStaticFiles = (app) => {
    app.use(express.static(path.join(__dirname, 'uploads')));
    app.use('/public/', express.static('uploads'));
}