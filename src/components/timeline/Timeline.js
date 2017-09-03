import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import timelineApi from '../../apiHelpers/timeline';

class Timeline extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.save = this.save.bind(this);
  }

  save() {
    timelineApi.timeline()
      .then(res => {
// eslint-disable-next-line no-console
        console.log(res.data);
      });
  }

  render() {

    return (
      <div>
        <Button bsStyle="primary" bsSize="large" active onClick={this.save}>Start Demo..</Button>
      </div>
    );
  }
}

export default Timeline;
