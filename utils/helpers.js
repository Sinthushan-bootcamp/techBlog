module.exports = {
  //helper function used in handlebars pages
    format_date: (date) => {
      var result = new Date(date);
      return result.toLocaleDateString('en-us'); //convert date to m/d/yyyy format
    },
  };