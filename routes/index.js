
/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.favorite = function(req, res){
  res.render('favorite', { title: 'My heart' });
};

exports.good = function(req, res){
  res.render('good', { title: 'vegetable' });
};