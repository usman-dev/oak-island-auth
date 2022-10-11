import { Button, Switch } from '@mui/material';

export const categoryTableColumns = ({ deleteAction, editAction }: any) => [
  { name: 'categoryName', label: 'Name', align: 'center' },
  { name: 'categoryEnum', label: 'Enum', align: 'center' },
  // { name: 'country', label: 'Country', align: 'center' },
  {
    name: 'categoryIcon',
    label: 'Icon',
    align: 'center',
    options: {
      filter: false,
      customBodyRender: (value: any, tableMeta: any) => {
        return (
          <div>
            {value ? (
              <img src={value} loading="lazy" width={50} height={50} />
            ) : null}
          </div>
        );
      },
    },
  },
  {
    name: 'activeCategoryIcon',
    label: 'Active Icon',
    align: 'center',
    options: {
      filter: false,
      customBodyRender: (value: any, tableMeta: any) => {
        return (
          <div>
            {value ? (
              <img src={value} loading="lazy" width={20} height={20} />
            ) : null}
          </div>
        );
      },
    },
  },
  {
    name: '',
    label: 'Actions',
    align: 'right',
    options: {
      setCellProps: () => ({
        align: 'right',
      }),
      customBodyRender: (value: any, tableMeta: any) => (
        <div>
          <Button onClick={() => editAction(value, tableMeta)}>Edit</Button>
          {/* <Button onClick={() => deleteAction(value, tableMeta)}>Delete</Button> */}
        </div>
      ),
    },
  },
];

export const menuCardsTableColumns = ({
  deleteAction,
  editAction,
  redirectAction,
}: any) => [
  {
    name: 'sno',
    label: 'S.No',
    align: 'center',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, update) => {
        let rowIndex = Number(tableMeta.rowIndex) + 1;
        return <span>{rowIndex}</span>;
      },
    },
  },
  { name: 'cardName', label: 'Card Name', align: 'center' },
  { name: 'type', label: 'Card Type', align: 'center' },
  {
    name: 'showOnDashboard',
    label: 'Show on Dashboard ',
    align: 'center',
    options: {
      customBodyRender: (value: any, tableMeta: any) => {
        return (
          <Switch
            checked={value}
            onChange={(event) =>
              editAction('show', event.target.checked, tableMeta)
            }
          />
        );
      },
    },
  },
  {
    name: '',
    label: 'Actions',
    align: 'right',
    options: {
      setCellProps: () => ({
        align: 'right',
      }),
      customBodyRender: (value: any, tableMeta: any) => {
        return tableMeta?.rowData?.[2] === 'Shortcuts' ||
          tableMeta?.rowData?.[2] === 'TopPicks' ||
          tableMeta?.rowData?.[2] === 'General' ? (
          <div>
            <Button
              style={{ color: 'red' }}
              onClick={() => editAction('', value, tableMeta)}>
              Edit
            </Button>{' '}
            |
            <Button
              style={{ color: 'red' }}
              onClick={() => deleteAction(value, tableMeta)}>
              Delete
            </Button>{' '}
            |
            <Button
              style={{ color: 'red' }}
              onClick={() => redirectAction(value, tableMeta)}>
              Add Feature
            </Button>
          </div>
        ) : tableMeta?.rowData?.[2] === 'HomeBar' ? (
          <Button
            style={{ color: 'red' }}
            onClick={() => redirectAction(value, tableMeta)}>
            Add Feature
          </Button>
        ) : (
          <Button
            style={{ color: 'red' }}
            onClick={() => editAction('', value, tableMeta)}>
            Edit
          </Button>
        );
      },
    },
  },
];

export const hamburgerMenu = ({ editAction, redirectAction }: any) => [
  {
    name: 'sno',
    label: 'S.No',
    align: 'center',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta) => {
        let rowIndex = Number(tableMeta.rowIndex) + 1;
        return <span>{rowIndex}</span>;
      },
    },
  },
  { name: 'hamburgerName', label: 'Name', align: 'center' },
  {
    name: '',
    label: 'Actions',
    align: 'right',
    options: {
      setCellProps: () => ({
        align: 'right',
      }),
      customBodyRender: (value: any, tableMeta: any) => (
        <Button
          style={{ color: 'red' }}
          onClick={() => redirectAction(value, tableMeta)}>
          Add Feature
        </Button>
      ),
    },
  },
];

export const cardCategoryTableColumns = ({ deleteAction, editAction }: any) => [
  {
    name: 'sno',
    label: 'S.No',
    align: 'center',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, update) => {
        let rowIndex = Number(tableMeta.rowIndex) + 1;
        return <span>{rowIndex}</span>;
      },
    },
  },
  { name: 'categoryName', label: 'Name', align: 'center' },
  { name: 'categoryStatus', label: 'Status', align: 'center' },
  // {
  //   name: 'widgetIcon',
  //   label: 'Icon ',
  //   align: 'center',
  //   options: {
  //     customBodyRender: (value: any) => {
  //       return <Avatar variant="square" src={value?.image} />;
  //     },
  //   },
  // },
  {
    name: 'visible',
    label: 'Show ',
    align: 'center',
    options: {
      customBodyRender: (value: any, tableMeta: any) => {
        return (
          <Switch
            checked={value}
            onChange={(event) =>
              editAction('show', event.target.checked, tableMeta)
            }
          />
        );
      },
    },
  },
  {
    name: '',
    label: 'Actions',
    align: 'right',
    options: {
      setCellProps: () => ({
        align: 'right',
      }),
      customBodyRender: (value: any, tableMeta: any) => (
        <div>
          <Button
            style={{ color: 'red' }}
            onClick={() => editAction('', value, tableMeta)}>
            Edit
          </Button>
          |
          <Button
            style={{ color: 'red' }}
            onClick={() => deleteAction(value, tableMeta)}>
            Delete
          </Button>
        </div>
      ),
    },
  },
];

export const hamburgerFeature = ({ deleteAction, editAction }: any) => [
  {
    name: 'sno',
    label: 'S.No',
    align: 'center',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, update) => {
        let rowIndex = Number(tableMeta.rowIndex) + 1;
        return <span>{rowIndex}</span>;
      },
    },
  },
  { name: 'categoryName', label: 'Name', align: 'center' },
  {
    name: '',
    label: 'Actions',
    align: 'right',
    options: {
      setCellProps: () => ({
        align: 'right',
      }),
      customBodyRender: (value: any, tableMeta: any) => (
        <Button
          style={{ color: 'red' }}
          onClick={() => deleteAction(value, tableMeta)}>
          Delete
        </Button>
      ),
    },
  },
];

export const faqCategoryTableColumns = ({
  deleteAction,
  editAction,
  redirectAction,
}: any) => [
  {
    name: 'sno',
    label: 'S.No',
    align: 'center',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, update) => {
        let rowIndex = Number(tableMeta.rowIndex) + 1;
        return <span>{rowIndex}</span>;
      },
    },
  },
  { name: 'categoryName', label: 'FAQ Category', align: 'center' },
  // { name: 'answer', label: 'Answer', align: 'center' },
  {
    name: '',
    label: 'Actions',
    align: 'right',
    options: {
      setCellProps: () => ({
        align: 'right',
      }),
      customBodyRender: (value: any, tableMeta: any) => (
        <div>
          <Button onClick={() => editAction(value, tableMeta)}>Edit</Button>
          <Button onClick={() => deleteAction(value, tableMeta)}>Delete</Button>
          <Button onClick={() => redirectAction(value, tableMeta)}>FAQs</Button>
        </div>
      ),
    },
  },
];

export const countryParishTableColumns = ({
  deleteAction,
  editAction,
  redirectAction,
}: any) => [
  {
    name: 'sno',
    label: 'S.No',
    align: 'center',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, update) => {
        let rowIndex = Number(tableMeta.rowIndex) + 1;
        return <span>{rowIndex}</span>;
      },
    },
  },
  { name: 'countryName', label: 'Country', align: 'center' },
  // { name: 'answer', label: 'Answer', align: 'center' },
  {
    name: '',
    label: 'Actions',
    align: 'right',
    options: {
      setCellProps: () => ({
        align: 'right',
      }),
      customBodyRender: (value: any, tableMeta: any) => (
        <div>
          <Button onClick={() => redirectAction(value, tableMeta)}>
            Add Parishes
          </Button>
        </div>
      ),
    },
  },
];

export const faqTableColumns = ({ deleteAction, editAction }: any) => [
  {
    name: 'sno',
    label: 'S.No',
    align: 'center',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, update) => {
        let rowIndex = Number(tableMeta.rowIndex) + 1;
        return <span>{rowIndex}</span>;
      },
    },
  },
  { name: 'question', label: 'Question', align: 'center' },
  {
    name: 'visible',
    label: 'Show ',
    align: 'center',
    options: {
      customBodyRender: (value: any, tableMeta: any) => {
        return (
          <Switch
            checked={value}
            onChange={(event) =>
              editAction('show', event.target.checked, tableMeta)
            }
          />
        );
      },
    },
  },
  // { name: 'answer', label: 'Answer', align: 'center' },
  {
    name: '',
    label: 'Actions',
    align: 'right',
    options: {
      setCellProps: () => ({
        align: 'right',
      }),
      customBodyRender: (value: any, tableMeta: any) => (
        <div>
          <Button onClick={() => editAction('', value, tableMeta)}>Edit</Button>
          <Button onClick={() => deleteAction(value, tableMeta)}>Delete</Button>
        </div>
      ),
    },
  },
];

export const secretQuestionTableColumns = ({
  deleteAction,
  editAction,
}: any) => [
  {
    name: 'sno',
    label: 'S.No',
    align: 'center',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, update) => {
        let rowIndex = Number(tableMeta.rowIndex) + 1;
        return <span>{rowIndex}</span>;
      },
    },
  },
  { name: 'question', label: 'Question', align: 'center' },
  {
    name: 'visible',
    label: 'Show ',
    align: 'center',
    options: {
      customBodyRender: (value: any, tableMeta: any) => {
        return (
          <Switch
            checked={value}
            onChange={(event) =>
              editAction('show', event.target.checked, tableMeta)
            }
          />
        );
      },
    },
  },

  {
    name: '',
    label: 'Actions',
    align: 'right',
    options: {
      setCellProps: () => ({
        align: 'right',
      }),
      customBodyRender: (value: any, tableMeta: any) => (
        <div>
          <Button onClick={() => editAction('', value, tableMeta)}>Edit</Button>
          <Button onClick={() => deleteAction(value, tableMeta)}>Delete</Button>
        </div>
      ),
    },
  },
];

export const vouchersTableColumns = ({ deleteAction, editAction }: any) => [
  {
    name: 'sno',
    label: 'S.No',
    align: 'center',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, update) => {
        let rowIndex = Number(tableMeta.rowIndex) + 1;
        return <span>{rowIndex}</span>;
      },
    },
  },
  { name: 'campaignName', label: 'Campaign', align: 'center' },
  { name: 'campaignCode', label: 'Campaign Code', align: 'center' },
  {
    name: 'campaignEndDate',
    label: 'Validate Date',
    align: 'center',
    options: {
      customBodyRender: (value: any, tableMeta: any) => (
        <div>{new Date(value).toLocaleDateString()}</div>
      ),
    },
  },
  { name: 'bonusAmount', label: 'Bonus Amount', align: 'center' },
  { name: 'campaignTotalBudget', label: 'Budget Amount', align: 'center' },
  {
    name: 'isEnabled',
    label: 'Active',
    align: 'center',
    options: {
      customBodyRender: (value: any, tableMeta: any) => {
        return (
          <Switch
            checked={value}
            onChange={(event) =>
              editAction('show', event.target.checked, tableMeta)
            }
          />
        );
      },
    },
  },

  {
    name: '',
    label: 'Actions',
    align: 'right',
    options: {
      setCellProps: () => ({
        align: 'right',
      }),
      customBodyRender: (value: any, tableMeta: any) => (
        <div>
          <Button onClick={() => editAction('', value, tableMeta)}>Edit</Button>
          <Button onClick={() => deleteAction(value, tableMeta)}>Delete</Button>
        </div>
      ),
    },
  },
];

export const notificationsTableColumns = ({
  deleteAction,
  editAction,
}: any) => [
  {
    name: 'sno',
    label: 'S.No',
    align: 'center',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, update) => {
        let rowIndex = Number(tableMeta.rowIndex) + 1;
        return <span>{rowIndex}</span>;
      },
    },
  },
  { name: 'title', label: 'Title', align: 'center' },
  // { name: 'answer', label: 'Answer', align: 'center' },
  {
    name: '',
    label: 'Actions',
    align: 'right',
    options: {
      setCellProps: () => ({
        align: 'right',
      }),
      customBodyRender: (value: any, tableMeta: any) => (
        <div>
          <Button onClick={() => editAction(value, tableMeta)}>Edit</Button>
          <Button onClick={() => deleteAction(value, tableMeta)}>Delete</Button>
        </div>
      ),
    },
  },
];

export const parishTableColumns = ({ deleteAction, editAction }: any) => [
  {
    name: 'sno',
    label: 'S.No',
    align: 'center',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, update) => {
        let rowIndex = Number(tableMeta.rowIndex) + 1;
        return <span>{rowIndex}</span>;
      },
    },
  },
  { name: 'parishName', label: 'Parish', align: 'center' },
  // { name: 'answer', label: 'Answer', align: 'center' },
  {
    name: '',
    label: 'Actions',
    align: 'right',
    options: {
      setCellProps: () => ({
        align: 'right',
      }),
      customBodyRender: (value: any, tableMeta: any) => (
        <div>
          <Button onClick={() => editAction(value, tableMeta)}>Edit</Button>
          <Button onClick={() => deleteAction(value, tableMeta)}>Delete</Button>
        </div>
      ),
    },
  },
];

export const bannerTableColumns = ({ deleteAction, editAction }: any) => [
  {
    name: 'image',
    label: 'image',
    align: 'center',
    options: {
      customBodyRender: (value: any, tableMeta: any) => {
        return (
          <div>
            <img
              width="200"
              height="100"
              className="imageFit"
              src={value}
              loading="lazy"
            />
          </div>
        );
      },
    },
  },
  {
    name: 'visible',
    label: 'Visible',
    align: 'center',
    options: {
      customBodyRender: (value: any, tableMeta: any) => {
        return (
          <Switch
            checked={value}
            onChange={(event) =>
              editAction(event.target.checked, tableMeta, 'show')
            }
          />
        );
      },
    },
  },
  {
    name: 'sno',
    label: 'Position',
    align: 'center',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, update) => {
        let rowIndex = Number(tableMeta.rowIndex) + 1;
        return <span>{rowIndex}</span>;
      },
    },
  },
  // { name: 'position', label: 'position', align: 'center' },
  {
    name: '',
    label: 'Actions',
    align: 'right',
    options: {
      setCellProps: () => ({
        align: 'right',
      }),
      customBodyRender: (value: any, tableMeta: any) => (
        <div>
          <Button onClick={() => editAction(value, tableMeta, '')}>Edit</Button>
          <Button onClick={() => deleteAction(value, tableMeta)}>Delete</Button>
        </div>
      ),
    },
  },
];

export const accStatus = [
  { label: 'User Created But OTP Not Verified', value: '01' },
  { label: 'OTP Verified, Take Him To TRN', value: '02' },
  { label: 'TRN Validated. Take Him To SetMPIN', value: '03' },
  { label: 'Awaiting Set MPIN', value: '04' },
  { label: 'User Fully Registered.', value: '05' },
  {
    label: 'User Device Change Was Initiated But Device Not Changed Yet.',
    value: '06',
  },
];

const checkStatus = (val) => {
  if (val === '01') {
    return <div>{accStatus[0].label}</div>;
  }
  if (val === '02') {
    return <div>{accStatus[1].label}</div>;
  }
  if (val === '03') {
    return <div>{accStatus[2].label}</div>;
  }
  if (val === '04') {
    return <div>{accStatus[3].label}</div>;
  }
  if (val === '05') {
    return <div>{accStatus[4].label}</div>;
  }
  if (val === '06') {
    return <div>{accStatus[5].label}</div>;
  }

  return ';';
};

export const registerReportTableColumns = () => [
  {
    name: 'createdAt',
    label: 'date',
    align: 'center',
    options: {
      customBodyRender: (value: any, tableMeta: any) => (
        <div>{value ? new Date(value).toLocaleDateString() : ''}</div>
      ),
    },
  },
  {
    name: 'firstName',
    label: 'Username',
    align: 'center',
  },
  // {
  //   name: 'dob',
  //   label: 'DOB',
  //   align: 'center',
  // },
  { name: 'phoneNumber', label: 'Phone Number', align: 'center' },
  // { name: '', label: '', align: 'right' },
  {
    name: 'accountStatusCode',
    label: 'Account Status',
    align: 'center',
    options: {
      setCellProps: () => ({
        align: 'right',
      }),
      customBodyRender: (value: any, tableMeta: any) => {
        return checkStatus(value);
      },
    },
  },
  // {
  //   name: 'trnNumber',
  //   label: 'TRN Number',
  //   align: 'center',
  // },
];

export const referralReportTableColumns = () => [
  // {
  //   name: 'createdAt',
  //   label: 'date',
  //   align: 'center',
  //   options: {
  //     customBodyRender: (value: any, tableMeta: any) => (
  //       <div>{value ? new Date(value).toLocaleDateString() : ''}</div>
  //     ),
  //   },
  // },
  {
    name: 'referralCode',
    label: 'Referral Code',
    align: 'center',
  },

  { name: 'fromMsisdn', label: 'From Msisdn', align: 'center' },
  { name: 'toMsisdn', label: 'To Msisdn', align: 'center' },
  { name: 'senderBonus', label: 'Sender Bonus', align: 'center' },
  { name: 'receiverBonus', label: 'Receiver Bonus', align: 'center' },
  { name: 'invitationDate', label: 'Invited On', align: 'center' },
  { name: 'redemptionDate', label: 'Redeemed On', align: 'center' },
  {
    name: 'isInvitedByApp',
    label: 'App Invite',
    align: 'center',
    options: {
      setCellProps: () => ({
        align: 'center',
      }),
      customBodyRender: (value: any, tableMeta: any) => {
        return value === true ? <p>Yes</p> : <p>No</p>;
      },
    },
  },
  // { name: '', label: '', align: 'right' },
  {
    name: 'isAccept',
    label: 'Accepted',
    align: 'center',
    options: {
      setCellProps: () => ({
        align: 'center',
      }),
      customBodyRender: (value: any, tableMeta: any) => {
        return value === true ? <p>Yes</p> : <p>No</p>;
      },
    },
  },
  // {
  //   name: 'trnNumber',
  //   label: 'TRN Number',
  //   align: 'center',
  // },
];

export const logsTableColumns = () => [
  {
    name: 'date',
    label: 'date',
    align: 'center',
    options: {
      customBodyRender: (value: any, tableMeta: any) => (
        <div>{new Date(value).toLocaleDateString()}</div>
      ),
    },
  },
  {
    name: 'method',
    label: 'method',
    align: 'center',
  },
  {
    name: 'route',
    label: 'route',
    align: 'center',
  },
  { name: 'service', label: 'service', align: 'center' },
  { name: 'response', label: 'response', align: 'left' },
  // { name: 'answer', label: 'Answer', align: 'center' },
];

export const feedbackTableColumns = ({ deleteAction, editAction }: any) => [
  {
    name: 'title',
    label: 'title',
    align: 'center',
  },
  { name: 'email', label: 'email', align: 'center' },
  {
    name: '',
    label: 'Actions',
    align: 'right',
    options: {
      setCellProps: () => ({
        align: 'right',
      }),
      customBodyRender: (value: any, tableMeta: any) => (
        <div>
          <Button onClick={() => editAction(value, tableMeta)}>Edit</Button>
          <Button onClick={() => deleteAction(value, tableMeta)}>Delete</Button>
        </div>
      ),
    },
  },
];

export const carouselTableColumns = ({ deleteAction, editAction }: any) => [
  {
    name: 'sno',
    label: 'Position',
    align: 'center',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, update) => {
        let rowIndex = Number(tableMeta.rowIndex) + 1;
        return <span>{rowIndex}</span>;
      },
    },
  },
  { name: 'title', label: 'Title', align: 'center' },
  { name: 'subtitle', label: 'Subtitle', align: 'center' },
  // { name: 'position', label: 'Position', align: 'center' },
  {
    name: 'image',
    label: 'icon',
    align: 'center',
    options: {
      filter: false,
      customBodyRender: (value: any, tableMeta: any) => {
        return (
          <div>
            {value ? (
              <img src={value} loading="lazy" className="imageFit" />
            ) : null}
          </div>
        );
      },
    },
  },
  {
    name: '',
    label: 'Actions',
    align: 'right',
    options: {
      setCellProps: () => ({
        align: 'right',
      }),
      customBodyRender: (value: any, tableMeta: any) => (
        <div>
          <Button onClick={() => editAction(value, tableMeta)}>Edit</Button>
          <Button onClick={() => deleteAction(value, tableMeta)}>Delete</Button>
        </div>
      ),
    },
  },
];

export const billCategoryTableColumns = ({
  deleteAction,
  editAction,
  redirectAction,
}: any) => [
  {
    name: 'sno',
    label: 'S.No',
    align: 'center',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, update) => {
        let rowIndex = Number(tableMeta.rowIndex) + 1;
        return <span>{rowIndex}</span>;
      },
    },
  },
  { name: 'categoryName', label: 'Bill Category', align: 'center' },
  {
    name: 'image',
    label: 'icon',
    align: 'center',
    options: {
      filter: false,
      customBodyRender: (value: any, tableMeta: any) => {
        return (
          <div>
            {value ? (
              <img src={value} loading="lazy" className="imageFir" />
            ) : null}
          </div>
        );
      },
    },
  },
  {
    name: '',
    label: 'Actions',
    align: 'right',
    options: {
      setCellProps: () => ({
        align: 'right',
      }),
      customBodyRender: (value: any, tableMeta: any) => (
        <div>
          <Button onClick={() => editAction(value, tableMeta)}>Edit</Button>
          <Button onClick={() => deleteAction(value, tableMeta)}>Delete</Button>
          <Button onClick={() => redirectAction(value, tableMeta)}>
            Billing Companies
          </Button>
        </div>
      ),
    },
  },
];

export const billCompanyTableColumns = ({ deleteAction, editAction }: any) => [
  {
    name: 'image',
    label: 'icon',
    align: 'center',
    options: {
      filter: false,
      customBodyRender: (value: any, tableMeta: any) => {
        return (
          <div>
            {value ? (
              <img
                src={value}
                width={100}
                height={100}
                loading="lazy"
                className="imageFit"
              />
            ) : null}
          </div>
        );
      },
    },
  },
  { name: 'companyName', label: 'Bill Company', align: 'center' },
  { name: 'billShortCode', label: 'Short Code', align: 'center' },
  {
    name: 'referenceNumberLength',
    label: 'Reference# Length',
    align: 'center',
  },
  { name: 'paymentType', label: 'Payment Type', align: 'center' },
  // { name: 'answer', label: 'Answer', align: 'center' },
  {
    name: '',
    label: 'Actions',
    align: 'right',
    options: {
      setCellProps: () => ({
        align: 'right',
      }),
      customBodyRender: (value: any, tableMeta: any) => (
        <div>
          <Button onClick={() => editAction(value, tableMeta)}>Edit</Button>
          <Button onClick={() => deleteAction(value, tableMeta)}>Delete</Button>
        </div>
      ),
    },
  },
];

export const topupColumns = ({ deleteAction, editAction }: any) => [
  {
    name: 'image',
    label: 'icon',
    align: 'center',
    options: {
      filter: false,
      customBodyRender: (value: any, tableMeta: any) => {
        return (
          <div>
            {value ? (
              <img
                src={value}
                width={100}
                height={100}
                className="imageFit"
                loading="lazy"
              />
            ) : null}
          </div>
        );
      },
    },
  },
  { name: 'operatorName', label: 'Operator Name', align: 'center' },
  {
    name: 'numberTypes',
    label: 'Number type',
    options: {
      customBodyRender: (value: any, tableMeta: any) => {
        return (
          <div>
            {[
              ...value.map((obj, index) =>
                ['numberType'].reduce(
                  (acc, key) =>
                    `${acc}${!acc.length ? '' : ','} ${index > 0 ? ',' : ''} ${
                      !obj[key] ? '' : obj[key]
                    }`,
                  '',
                ),
              ),
            ].join('\n')}
          </div>
        );
      },
    },
  },
  {
    name: 'billTypes',
    label: 'Type',
    align: 'center',
    options: {
      customBodyRender: (value: any, tableMeta: any) => {
        return (
          <div>
            {[
              ...value.map((obj, index) =>
                ['billType'].reduce(
                  (acc, key) =>
                    `${acc}${!acc.length ? '' : ','} ${index > 0 ? ',' : ''} ${
                      !obj[key] ? '' : obj[key]
                    }`,
                  '',
                ),
              ),
            ].join('\n')}
          </div>
        );
      },
    },
  },
  { name: 'productId', label: 'Product ID', align: 'center' },
  {
    name: '',
    label: 'Actions',
    align: 'right',
    options: {
      setCellProps: () => ({
        align: 'right',
      }),
      customBodyRender: (value: any, tableMeta: any) => (
        <div>
          <Button onClick={() => editAction(value, tableMeta)}>Edit</Button>
          <Button onClick={() => deleteAction(value, tableMeta)}>Delete</Button>
        </div>
      ),
    },
  },
];

export const agentTableColumns = ({ deleteAction, editAction }: any) => [
  // { name: 'bankId', label: 'Bank ID', align: 'center' },
  // { name: 'agentId', label: 'Agent ID', align: 'center' },
  { name: 'agentName', label: 'Agent Name', align: 'center' },
  {
    name: 'address',
    label: 'Parish',
    align: 'center',
    options: {
      customBodyRender: (value: any) => value?.parish,
    },
  },
  {
    name: 'address',
    label: 'Town',
    align: 'center',
    options: {
      customBodyRender: (value: any) => value?.town,
    },
  },
  {
    name: 'coordinates',
    label: 'Lat',
    align: 'center',
    options: {
      customBodyRender: (value: any) => value?.latitude,
    },
  },
  {
    name: 'coordinates',
    label: 'Long',
    align: 'center',
    options: {
      customBodyRender: (value: any) => value?.longitude,
    },
  },
  // { name: 'rating', label: 'Rating', align: 'center' },
  {
    name: '',
    label: 'Actions',
    align: 'right',
    options: {
      setCellProps: () => ({
        align: 'right',
      }),
      customBodyRender: (value: any, tableMeta: any) => (
        <div>
          <Button onClick={() => editAction(value, tableMeta)}>Edit</Button>
          <Button onClick={() => deleteAction(value, tableMeta)}>Delete</Button>
        </div>
      ),
    },
  },
];

export const usersTableColumns = ({ deleteAction, editAction }: any) => [
  { name: 'name', label: 'Name', align: 'center' },
  { name: 'email', label: 'Email', align: 'center' },
  {
    name: 'accountStatus',
    label: 'Active',
    align: 'center',
    options: {
      customBodyRender: (value: any, meta: any) => {
        return (
          <Switch
            checked={value}
            onChange={(event) =>
              editAction('accountStatus', event.target.checked, meta)
            }
          />
        );
      },
    },
  },
  {
    name: '',
    label: 'Actions',
    align: 'right',
    options: {
      setCellProps: () => ({
        align: 'right',
      }),
      customBodyRender: (value: any, tableMeta: any) => (
        <div>
          <Button onClick={() => editAction(null, value, tableMeta)}>
            Edit
          </Button>
          {/* <Button onClick={() => deleteAction(value, tableMeta)}>Delete</Button> */}
        </div>
      ),
    },
  },
];

export const countryTableColumns = ({ deleteAction, editAction }: any) => [
  { name: 'countryName', label: 'Name', align: 'center' },
  { name: 'countryCode', label: 'Code', align: 'center' },
  { name: 'phonePrefix', label: 'Prefix', align: 'center' },
  { name: 'currency', label: 'Currency', align: 'center' },
  {
    name: 'flag',
    label: 'Flag',
    align: 'center',
    options: {
      customBodyRender: (value: any, tableMeta: any) => {
        return (
          <div>
            {value ? (
              <img width="70" height="50" src={value} loading="lazy" />
            ) : null}
          </div>
        );
      },
    },
  },

  {
    name: '',
    label: 'Actions',
    align: 'right',
    options: {
      setCellProps: () => ({
        align: 'right',
      }),
      customBodyRender: (value: any, tableMeta: any) => (
        <div>
          <Button onClick={() => editAction(value, tableMeta)}>Edit</Button>
          <Button onClick={() => deleteAction(value, tableMeta)}>Delete</Button>
        </div>
      ),
    },
  },
];

export const bankTableColumns = ({ deleteAction, editAction }: any) => [
  { name: 'bankName', label: 'Name', align: 'center' },
  { name: 'bankCode', label: 'Code', align: 'center' },
  { name: 'bankSwiftCode', label: 'Swift Code', align: 'center' },
  { name: 'institutionId', label: 'Institution ID', align: 'center' },
  {
    name: 'hintText',
    label: 'Hint',
    align: 'center',
  },
  {
    name: 'accountNumberLength',
    label: 'Account# Length',
    align: 'center',
  },
  {
    name: 'accountMessageFormat',
    label: 'Account Message Format',
    align: 'center',
  },
  {
    name: '',
    label: 'Actions',
    align: 'right',
    options: {
      setCellProps: () => ({
        align: 'right',
      }),
      customBodyRender: (value: any, tableMeta: any) => (
        <div>
          <Button onClick={() => editAction(value, tableMeta)}>Edit</Button>
          <Button onClick={() => deleteAction(value, tableMeta)}>Delete</Button>
        </div>
      ),
    },
  },
];
