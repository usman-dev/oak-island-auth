import { useEffect, useState } from 'react';
// ** MUI Imports
import { Box, CircularProgress } from '@mui/material';
import productService from 'src/services/product.service';
// import StatisticsCard from 'src/views/dashboard/StatisticsCard';
import AddAmountInfo from 'src/views/p2p/AddAmountInfo';
import BankList from 'src/views/p2p/BanksList';
import Authenticated from '../../@core/components/Authenticated';

const P2p = () => {
  // const [banksData, setBanksData] = useState<any>([]);
  const [amount, setAmount] = useState<any>([{}]);
  const [tag, setTag] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async (type = '') => {
    if (!loading) setLoading(true);
    // let bankData: any,
    //   amountsData: any = '';
    let amountsData: any = '';

    switch (type) {
      // case 'bank':
      //   bankData = await productService.getBanks();
      //   if (bankData) {
      //     setBanksData([...bankData]);
      //   }
      //   break;
      case 'amounts':
        amountsData = await productService.getAmount('p2p');
        if (amountsData) {
          const amountsData1 = amountsData.map((item: any, index: any) => {
            return { value: item.amount, disabled: true };
          });
          let length = amountsData1.length;
          if (length !== 4) {
            for (let i = 0; i < 4 - length; i++) {
              amountsData1.push({ value: '' });
            }
          }

          setAmount(amountsData1);
          setTag(amountsData1);
        }
        break;

      default:
        // bankData = await productService.getBanks();
        amountsData = await productService.getAmount('p2p');
        // if (bankData) {
        //   setBanksData([...bankData]);
        // }
        if (amountsData) {
          const amountsData1 = amountsData.map((item: any, index: any) => {
            return { value: item.amount, disabled: true };
          });
          let length = amountsData1.length;
          if (length !== 4) {
            for (let i = 0; i < 4 - length; i++) {
              amountsData1.push({ value: '' });
            }
          }

          setAmount(amountsData1);
          setTag(amountsData1);
        }
    }

    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <Box>
          <CircularProgress
            sx={{
              display: 'flex',
              margin: '200px 50% 200px 50%',
            }}
            size={60}
          />
        </Box>
      ) : (
        <>
          <AddAmountInfo
            amountData={amount}
            setAmountData={setAmount}
            tagData={tag}
            setTagData={setTag}
            getAmount={getData}
          />
          {/* <br />
          <BankList banksData={banksData} getBank={getData} /> */}
        </>
      )}
    </>
  );
};

export default Authenticated(P2p);
// export default Dashboard;
