exports.homepage = (req, res) => {
  const locals = {
    title: "Notes App",
    description: "A free notes app",
  };
  res.render("index", {
    locals,
    layout: "./../views/layouts/front-page",
  });
};

exports.about = (req, res) => {
  const locals = {
    title: "About - Notes App",
    description: "A free notes app",
  };
  res.render("about", locals);
};
