const ProgressIndicator = ({ countries }) => {
  if (countries.length == 0) {
    return <p>Retrieving...</p>;
  }
  return null;
};

export default ProgressIndicator;
