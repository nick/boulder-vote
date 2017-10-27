import React, { Component } from 'react'

const ratingMessage = {
    1: "Dislike",
    2: "Inadequate",
    3: "Adequate",
    4: "Good",
    5: "Great!"
}

export default class Rate extends Component {

    constructor(props) {
        super(props)
        this.state = { rating: props.value };
    }

    classFor(val) {
        var mouseIsOver = this.state.mouseOver && this.state.over >= val,
            ratingIsOver = !this.state.mouseOver && this.state.rating >= val;

        return (mouseIsOver || ratingIsOver) ? ' active' : '-o';
    }

    render() {
        var overOrRating = this.state.over || this.state.rating,
            overCls = this.state.mouseOver && !this.state.didClick,
            onEnter = () => this.onEnter(),
            onLeave = () => this.onLeave();

        return (
          <div className={`big-stars${overCls ? ' over' : ''}`}>
            <span onMouseEnter={onEnter} onMouseLeave={onLeave}>
              {[1,2,3,4,5].map(val =>
                <i
                  key={val}
                  onMouseOver={() => this.didMouseOver(val)}
                  onClick={() => this.didClick(val)}
                  className={`fa fa-star${this.classFor(val)}`}
                />
              )}
            </span>
            <span className="msg">{ratingMessage[overOrRating]}</span>
          </div>
        );
    }

    onEnter() {
        this.setState({ mouseOver: true })
    }

    onLeave() {
        this.setState({ mouseOver: false, didClick: false, over: 0 })
    }

    didMouseOver(value) {
        if (!this.state.didClick) {
            this.setState({ over: value })
        }
    }

    didClick(rating) {
        this.setState({ rating, didClick: true });

        if (this.props.onChange) {
            this.props.onChange(rating);
        }
    }
}
