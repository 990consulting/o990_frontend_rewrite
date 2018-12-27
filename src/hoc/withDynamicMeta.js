import React, {Fragment} from 'react';
import { getPageMeta } from 'api/meta';
import { Helmet } from 'react-helmet';

const defaultTitle = 'Open990 - Home - free nonprofit data';
const defaultDescription = `Open990's free data profiles reveal trends on salary, expenses, and financial indicators for over a half million US tax-exempt foundations and charities. Unlocking open IRS Form 990 tax records to empower nonprofit leaders, journalists, and donors through data science.`;

function withDynamicMeta(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: defaultTitle,
        description: defaultTitle,
        noindex: false
      };
    }
    
    setMetaInfo() {
      //console.log("Most recent URL: " + this.props.location.pathname);
      getPageMeta(this.props.location.pathname).then(res => {
        const { title, description, noindex } = res.data;
        this.setState({
          title: title,
          description: description,
          noIndex: noindex
        })
      }).catch(error => {
        console.log(`Meta not provided for ${this.props.location.pathname} route`);
        this.setState({
          defaultTitle,
          defaultDescription,
          noIndex: false
        });
      });
    };
    
    componentDidMount() {
      this.setMetaInfo();
    }
  
    componentDidUpdate(prevProps) {
      if(this.props.location.pathname !== prevProps.location.pathname) {
        this.setMetaInfo();
      }
    }

    render() {
      const {title, description, noIndex} = this.state;
      return (
        <Fragment>
          <Helmet defer={false}>
            <title>{title}</title>
            <meta name="description" content={description} />
            { noIndex && <meta name="robots" content='noindex' /> }
          </Helmet>
          <WrappedComponent {...this.props} />)
        </Fragment>
      );
    }
  }
}

export default withDynamicMeta;