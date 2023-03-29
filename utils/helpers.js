module.exports = {
    format_date: (date) => {
      var result = new Date(date);
      result.setDate(result.getDate() + 1825);
      return result.toLocaleDateString('en-us');
    },
  };