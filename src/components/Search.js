import React, { Component } from 'react'

import algoliasearch from 'algoliasearch/lite';

export default class Search extends Component {

    constructor(props) {
        super(props)
        this.state = { query: '', results: [] };
    }

    initClient() {
        var client = algoliasearch("B8VKL8KF9M", "4565a2d3f74b00614b9e8a640798c157");
        this.index = client.initIndex('dev_Answers');
    }

    render() {
        return (
          <form className="form-inline ml-2 dropdown">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              value={this.state.query}
              onFocus={() => this.initClient()}
              onChange={(e) => {
                this.setState({ query: e.currentTarget.value })
                clearTimeout(this.timeout)
                this.timeout = setTimeout(() => this.doSearch(), 200)
              }}
            />
            {this.state.results.length === 0 ? null :
              <div className="dropdown-menu show" style={{ left: 'auto', right: '0.5rem' }}>
                {this.state.results.map((r, i) =>
                  <a
                    key={i}
                    className="dropdown-item"
                    href="#"
                    dangerouslySetInnerHTML={{ __html: r }}
                  />
                )}
              </div>
            }
          </form>
        )
    }

    doSearch() {
        this.index.search({
            query: this.state.query,
            attributesToSnippet: ['answer:6']
        }, (err, res) => {
            this.setState({
                results: res.hits.map(h => h._snippetResult.answer.value)
            })
        });
    }
}
