import axios from 'axios';
import { CONFIG } from '../../../ENV';

async function TransactionFetch(query, fetchConfig) {
  let data = [];
  let loading = true;
  let error = false;

  try {
    const result = await axios.post(
      `${CONFIG.PORTAL}/students-courses/getTransactionHistoryByStudent`,
      query,
      fetchConfig
    );
    data = result.data;
    loading = false;
  } catch (e) {
    error = e;
    loading = false;
  }

  return [loading, error, data];
}

export default TransactionFetch;
