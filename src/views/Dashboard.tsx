import React from 'react';
import Layout from '../components/shared/layout/Layout';
import ExpenseList from '../components/expenses/ExpenseList';

const Dashboard: React.FC = () => {

  return (
    <Layout breadCrumb={['', 'Dashboard']}>
      <ExpenseList />
    </Layout>
  );
};

export default Dashboard;
