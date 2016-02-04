/**
 * This file is provided by Facebook for testing and evaluation purposes
 * only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var React = require('react');
var PerfStore = require('../stores/PerfStore');
var ChatMessageActionCreators = require('../actions/ChatMessageActionCreators');
var interval, interval2;

function getStateFromStores() {
  return {
    messagesPerSecond: PerfStore.getAverageMessagesPerSecond(),
    totalMessages: PerfStore.getTotalMessages(),
  };
}

var PerfTest = React.createClass({

  getInitialState: function() {
      return {
        messagesPerSecond: 0,
        totalMessages: 0,
      };
  },

  componentDidMount: function() {
    var count = 0;
    var _this = this;

    interval = setInterval(function() {
        count++;
        ChatMessageActionCreators.createMessage(count, 't_3');
    }, 10);

    interval2 = setInterval(function() {
        _this._update();
    }, 500);
  },

  componentWillUnmount: function() {
    clearInterval(interval);
    clearInterval(interval2);
  },

  render: function() {
    return (
        <section className="perfTest">
            <p className="perfTest-message"><span className="perfTest-label">Messages per second:</span> { Math.floor(this.state.messagesPerSecond) }</p>
            <p className="perfTest-message"><span className="perfTest-label">Total messages:</span> { Math.floor(this.state.totalMessages) }</p>
        </section>
    );
  },

  _update: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = PerfTest;
