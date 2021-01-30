import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Board } from './components/Board';
import { Create } from './components/Create';
import '@atlaskit/css-reset';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/board' component={Board} />
        <Route exact path='/create' component={Create} />
      </Layout>
    );
  }
}
