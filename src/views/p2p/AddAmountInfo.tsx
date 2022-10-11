import { useState, useEffect } from 'react';
import productService from '../../services/product.service';
import Amounts from 'src/@core/components/Common/Amounts';
import { Box, CircularProgress } from '@mui/material';

interface Amount {
  amount: number;
}

const AddAmountInfo = ({
  amountData,
  setAmountData,
  tagData,
  setTagData,
  getAmount,
}) => {
  const [amount, setAmount] = useState<any>([{}]);
  const [tag, setTag] = useState<any>([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  let error: any = {};
  const validateNumeric = new RegExp('^[1-9][0-9]*$');

  const handleSubmit = async (e: any) => {
    for (const [i, item] of amount.entries()) {
      if (item.value <= 0) {
        error[`error${i}`] = 'This Field not to be 0 and negative';
        setErrors(error);
      } else if (item.value > 999999) {
        error[`error${i}`] = 'Value must be less 1000000 ';
        setErrors(error);
      } else if (validateNumeric.test(item.value) === false) {
        error[`error${i}`] = 'Value must not start with 0';

        setErrors(error);
      }
    }

    if (Object.keys(error).length === 0) {
      setButtonLoading(true);
      e.preventDefault();
      const amounts: Amount[] = new Array();
      amount.map((a: { value: number; disabled: boolean }) => {
        amounts.push({ amount: a.value });
      });
      const data = await productService.addAmount(amounts, 'p2p');
      if (data) {
        getAmount('amounts');
      }
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    setAmount(amountData);
    setTag(tagData);
  }, []);

  return (
    <>
      <Amounts
        amount={amount}
        setAmount={setAmount}
        tag={tag}
        handleSubmit={handleSubmit}
        loading={buttonLoading}
        errors={errors}
      />
    </>
  );
};

export default AddAmountInfo;
