import { useState, useEffect } from 'react';
import productService from '../../services/product.service';
import Amounts from 'src/@core/components/Common/Amounts';

interface Amount {
  amount: number;
}

const AddBillAmountInfo = () => {
  const [amount, setAmount] = useState<any>([{}]);
  const [tag, setTag] = useState<any>([]);
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  let error: any = {};
  const validateNumeric = new RegExp('^[1-9][0-9]*$');

  const changeAmount = (index: number, value: any) => {
    const newArr = [...amount];
    newArr[index] = { value, disabled: false };
    setAmount(newArr);
  };

  const handleSubmit = async (e: any) => {
    setErrors('');
    for (const [i, item] of amount.entries()) {
      if (item.value <= 0) {
        error[`error${i}`] = 'This Field not to be 0 and negative';
        setErrors(error);
      } else if (validateNumeric.test(item.value) === false) {
        error[`error${i}`] = 'Value must not start with 0';

        setErrors(error);
      } else if (item.value > 999999) {
        error[`error${i}`] = 'Value must be less than 1000000';

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
      const data = await productService.addAmount(amounts, 'bills');
      if (data) {
        getAmount();
      }
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    getAmount();
  }, []);

  const getAmount = async () => {
    const data = await productService.getAmount('bills');
    if (data) {
      const data1 = data.map((item: any, index: any) => {
        return { value: item.amount, disabled: true };
      });
      let length = data1.length;
      if (length !== 4) {
        for (let i = 0; i < 4 - length; i++) {
          data1.push({ value: '' });
        }
      }

      setAmount(data1);
      setTag(data1);
      setFlag(false);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Amounts
          amount={amount}
          setAmount={setAmount}
          tag={tag}
          handleSubmit={handleSubmit}
          loading={buttonLoading}
          errors={errors}
        />
      )}
    </>
  );
};

export default AddBillAmountInfo;
