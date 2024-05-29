export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    campName: string;
    state: string;
    nextFollowUp: string;
  };
  
  export const fakeData: User[] = [
    {
      id: '9s41rp',
      firstName: 'Kelvin',
      lastName: 'Langosh',
      email: 'Jerod14@hotmail.com',
      phone: '98299400281',
      campName: 'Python Camp',
      state: 'New',
      nextFollowUp: '28-May-2024',
    },
    {
      id: '08m6rx',
      firstName: 'Molly',
      lastName: 'Purdy',
      email: 'Hugh.Dach79@hotmail.com',
      phone: '7499382438',
      campName: 'Robotics Camp',
      state: 'New',
      nextFollowUp: '26-May-2024',
    },
    {
      id: '5ymtrc',
      firstName: 'Henry',
      lastName: 'Lynch',
      email: 'Camden.Macejkovic@yahoo.com',
      phone: '8959840238',
      campName: 'Robotics Camp',
      state: 'Converted',
      nextFollowUp: '30-May-2024',
    },
    {
      id: 'ek5b97',
      firstName: 'Glenda',
      lastName: 'Douglas',
      email: 'Eric0@yahoo.com',
      phone: '9438238202',
      campName: 'Coding Camp',
      state: 'Follow Up',
      nextFollowUp: '01-Jun-2024',
    },
    {
      id: 'xxtydd',
      firstName: 'Leone',
      lastName: 'Williamson',
      email: 'Ericka_Mueller52@yahoo.com',
      phone: '9834029384',
      campName: 'Drone Camp',
      state: 'Dead',
      nextFollowUp: '03-Jun-2024',
    },
    {
      id: 'wzxj9m',
      firstName: 'Mckenna',
      lastName: 'Friesen',
      email: 'Veda_Feeney@yahoo.com',
      phone: '9384830284',
      campName: 'Python Camp',
      state: 'New',
      nextFollowUp: '05-Jun-2024',
    },
    {
      id: '21dwtz',
      firstName: 'Wyman',
      lastName: 'Jast',
      email: 'Melvin.Pacocha@yahoo.com',
      phone: '9238482938',
      campName: 'Robotics Camp',
      state: 'Follow Up',
      nextFollowUp: '07-Jun-2024',
    },
    {
      id: 'o8oe4k',
      firstName: 'Janick',
      lastName: 'Willms',
      email: 'Delfina12@gmail.com',
      phone: '9384028438',
      campName: 'Coding Camp',
      state: 'Converted',
      nextFollowUp: '09-Jun-2024',
    },
  ];
  
  export const usStates = [
    'New',
    'Follow Up',
    'Dead',
    'Converted',
  ];
  
  