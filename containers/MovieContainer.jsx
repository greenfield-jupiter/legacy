import { connect } from 'react-redux';
import { fetchRatings, fetchSentiment, fetchTrends, clearMovie } from '../actions/MovieAction.js';
import MovieDetail from '../components/MovieDetail';

const mapStateToProps = ({ movie, trends }) => {
  return { movie, trends };
}

const mapDispatchToProps = {
  fetchRatings,
  fetchTrends,
  fetchSentiment,
  clearMovie
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
