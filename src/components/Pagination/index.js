import React, { Component } from 'react';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const defaultButton = props => <button {...props}>{props.children}</button>;

export default class Pagination extends Component {
    constructor(props) {
        super();

        this.changePage = this.changePage.bind(this);

        this.state = {
            visiblePages: this.getVisiblePages(null, props.pages)
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.pages !== nextProps.pages) {
            this.setState({
                visiblePages: this.getVisiblePages(null, nextProps.pages)
            });
        }

        this.changePage(nextProps.page + 1);
    }

    filterPages = (visiblePages, totalPages) => {
        return visiblePages.filter(page => page <= totalPages);
    };

    getVisiblePages = (page, total) => {
        if (total < 7) {
            return this.filterPages([1, 2, 3, 4, 5, 6], total);
        } else {
            if (page % 5 >= 0 && page > 4 && page + 2 < total) {
                return [1, page - 1, page, page + 1, total];
            } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
                return [1, total - 3, total - 2, total - 1, total];
            } else {
                return [1, 2, 3, 4, 5, total];
            }
        }
    };

    changePage(page) {
        const activePage = this.props.page + 1;

        if (page === activePage) {
            return;
        }

        const visiblePages = this.getVisiblePages(page, this.props.pages);

        this.setState({
            visiblePages: this.filterPages(visiblePages, this.props.pages)
        });

        this.props.onPageChange(page - 1);
    }

    render() {
        const { PageButtonComponent = defaultButton } = this.props;
        const { visiblePages } = this.state;
        const activePage = this.props.page + 1;

        return (
            <div className="Table__pagination">
                <div className="Table__prevPageWrapper">
                    <PageButtonComponent
                        className="Table__pageButton"
                        onClick={() => {
                            if (activePage === 1) return;
                            this.changePage(activePage - 1);
                        }}
                        disabled={activePage === 1}
                    >
                        <ChevronLeftIcon/>
                        Prev
                        {/*{this.props.previousText}*/}
                    </PageButtonComponent>
                </div>
                <div className="Table__visiblePagesWrapper">
                    {visiblePages.map((page, index, array) => {
                        return (
                            <div style={{display:'inline'}} key={page}>
                                {array[index - 1] + 2 < page ? `...` : null}
                            <PageButtonComponent
                                className={
                                    activePage === page
                                        ? "Table__pageButton Table__pageButton--active"
                                        : "Table__pageButton"
                                }
                                onClick={this.changePage.bind(null, page)}
                            >
                                {page}
                            </PageButtonComponent>
                            </div>
                        );
                    })}
                </div>
                <div className="Table__nextPageWrapper">
                    <PageButtonComponent
                        className="Table__pageButton"
                        onClick={() => {
                            if (activePage === this.props.pages) return;
                            this.changePage(activePage + 1);
                        }}
                        disabled={activePage === this.props.pages}
                    >
                        {this.props.nextText}
                        <ChevronRightIcon/>
                    </PageButtonComponent>
                </div>
            </div>
        );
    }
}
