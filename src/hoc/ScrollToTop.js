import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { scrollTo } from 'utils/helpers';

export class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      scrollTo(this.props);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);