 // Navbar imports
import store from '../../public/assets/icons/store.svg'
import users from '../../public/assets/icons/users.svg'
import calender from  "../../public/assets/icons/calender.svg"
import files from '../../public/assets/icons/BlackFile.svg'
import metrics from '../../public/assets/icons/metrics.svg'
import home from '../../public/assets/icons/Home.svg'
import whiteHome from '../../public/assets/icons/Whitehome.svg'
import file from '../../public/assets/icons/file.svg'
import settings from '../../public/assets/icons/settings.svg'

// Avatar imports
import avatar1 from '../../public/assets/icons/Ellipse 19.svg'
import avatar2 from '../../public/assets/icons/defaultAvatar2.svg'

// SearchBar imports
import Searchdocument1 from '../../public/assets/icons/Searchdocument1.svg'
import Searchdocuments2 from '../../public/assets/icons/Searchdocuments2.svg'

export const FileSyncConstant=['Sync in progress' ,'Closing this window will not interrupt your sync']
export const FileSyncConstants=[ {"name":'Estimated time - 10 mins'},{"name":'Completed 4/5'},]
 
export const Images=[
    {
        "imageUrl":  store,
        "name":"office"
    },
    {
        "imageUrl":  users,
        "name":"People"
    },
    {
        "imageUrl":  calender ,
        "name":"Calender"
    },
    {
        "imageUrl": files,
        "name":"Files"
    },
    {
        "imageUrl": metrics,
        "name":"Metrics"
    }
]
 

export const NavBarImages=[whiteHome,home,file,settings]
export const password="John@12345"

 
export const search_key_sentence="Since being established in 1908 as a sewing machine repair business, the brother group has pursued the diversification and globalization of business in its history of more..."
export const reset_password="Reset your password";
export const verification="The verification mail will be sent to the mailbox.  please check it";
export const create_password="Create new password";
export const enter_password="Enter new password below to change your password";
export const password_validation="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one special character."
export const passwords_mismatch_error="The new password and confirmed new password should match"
export const password_regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const email_error='Please enter a valid email address.'
export const password_placeholder="***********"
export const copied_text="Text copied"
export const server_error="An error occurred while processing your request. Please try again later."
export const records_not_found_error="Data not found in our records. Please check your Login Credentials"

export const RadioTypoConst=['Sync entire drive','Sync folders']
 
export const NAME_REQ_ERROR = 'name is required';
export const NAME_MIN_LENGTH = 'User name should be minimum 4 characters';
export const NAME_MAX_LENGTH = 'User name should be maximum 50 characters';

export const EMAIL_REQ_ERROR = 'Email is required';
export const EMAIL_VALID = 'Please enter a valid email address';

export const PASSWORD_REQ_ERROR = 'Password is required';
export const PASSWORD_UPPER_LETTE =
    'First letter of the password must be uppercase';
export const PASSWORD_LOWER_LETTER =
    'Password must contain at least 1 lowercase letter';
export const PASSWORD_SPECIAL_CHARACTER =
    'Password must contain at least 1 special character';
export const PASSWORD_MIN_LENGTH =
    'Password must be at least 8 characters long';

export const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const PASSWORD_UPPER_REGEX = /^[A-Z]/;
export const PASSWORD_LOWER_REGEX = /[a-z]/;
export const PASSWORD_SPECIAL_REGEX = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/;
export const SIGN_UP="Sign Up"
 

export const UploadFileConstant=[
    {
      label: 'Uploads',
      content: ' Content for Tab 1' ,
      disabled:false
    },
    {
      label: 'Cloud storage',
      content:'  Content for Tab 2 ' ,
      disabled:false
    },
  ] 

 
export const UploadFileConstants=['Upload files','Drop your files here','Choose Files','Contract agreement.pdf']
  
export const PASSWORD_RESET_SUCCESS_TITLE = 'Password reset';
export const PASSWORD_RESET_SUCCESS_SUBTEXT = 'Your password has been successfully reset. Click below to login magically.';
export const PASSWORD_RESET_SUCCESS_BUTTON = 'Continue';

export const TEXT=" already exists in this location. Do you want to replace the existing file with a new version or keep both files?"
 
export const SIGN_IN="Sign In";
export const REMEMBER_ME="Remember me";
export const FORGOT_PASSWORD="Forgot password?";
export const OR="OR";
export const GOOGLE="Continue with google";
export const NO_ACCOUNT="Doesn`t have an account?";
 
 
export const SearchbarConstant=[
    {
        "name":"Company agreement.pdf"
    },
    {
        "name":"Software agreement 2.pdf"
    },
    {
        "name":"Software agreement 3.pdf"
    },
    {
        "name":"Company agreement.pdf"
    },
    {
        "name":"Software agreement 2.pdf"
    },
    {
        "name":"Software agreement 3.pdf"
    },
]

export const SearchBarImages=[Searchdocument1,Searchdocuments2]


export const NotificationList = [
    {
      id: '1',
      avatarUrl: avatar1,
      userName: 'Amit',
      message: 'has uploaded company agreement.pdf',
      updateDate: new Date('2023-06-20T10:30:00'),
    },
    {
      id: '2',
      avatarUrl: avatar1,
      userName: 'Amit',
      message: 'has uploaded company profile.pdf',
      updateDate: new Date('2023-06-10T10:50:00'),
    },
    {
      id: 3,
      avatarUrl: avatar1,
      userName: 'Amit',
      message: 'has uploaded company agreement.pdf',
      updateDate: new Date('2023-06-20T10:30:00'),
    },
      {
        id: 4,
        avatarUrl: avatar2,
        userName: 'John',
        message: 'request access to User agreement.pdf',
        updateDate: new Date('2023-06-03T09:30:00'),
      },
      {
        id: 5,
        avatarUrl: avatar1,
        userName: 'Amit',
        message: 'has uploaded company agreement.pdf',
        updateDate: new Date('2023-06-12T12:30:00'),
      },
      {
        id: 6,
        avatarUrl: avatar1,
        userName: 'Amit',
        message: 'deleted company agreement.pdf',
        updateDate: new Date('2023-06-01T09:30:00'),
      },

  ];

 export const DISCORYDOCS= 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
  export const SCOPE= 'https://www.googleapis.com/auth/drive.metadata.readonly'

  export const FOLDERHEAD="Choose the folders to sync with contiq"

  // below mock data
export const tabs = [
  {
    label: 'All files',
    content: '',
    disabled: false,
  },
  {
    label: 'Slides',
    content: '',
    disabled: true,
  },
  {
    label: 'Docs',
    content: '',
    disabled: true,
  },
];

export const fileTypeList= [
  {
      text: 'PDF'
  },
  {
      text: 'PPT'
  },
  {
      text: 'Image'
  }
];

export const publishSettingList=[
    {
        text: 'Published by me'
    },
    {
        text: 'Published by Sales team'
    },
    {
        text: 'Published by others'
    }
]

  export const HomePageConstants=['Home','Recent','No files availabe','Start by syncing your cloud storage to contiq']

