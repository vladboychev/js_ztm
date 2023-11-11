it("Shows an autocomplete", () => {
  createAutoComplete({
    root: document.querySelector("#target"),
    fetchData() {
      return [
        { Title: "New Hope" },
        { Title: "Old Hope" },
        { Title: "No Hope" },
      ];
    },
    renderOption(movie) {
      return movie.Title;
    },
  });
});
