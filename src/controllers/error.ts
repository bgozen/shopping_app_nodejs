import express from 'express'


export const get404:express.RequestHandler = (req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' });
};
