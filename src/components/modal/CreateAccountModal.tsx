'use client'
import { useUser } from '@/context/AppContext';
import { useModal } from '@/context/ModalContext';
import { FormEvent, useState} from 'react';

export default function CreateAccountModal() {
  const {isOpen, setIsOpen} = useModal(); // State for modal visibility
  const {id, role} = useUser();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleClose = () => setIsOpen(false);

  const handleCreateAccount = async (event:FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Implement your account creation logic here (e.g., API call, validation)
    console.log('Account creation logic would go here');
    const accountRole = role === 'Sales Leader' ? 'Sales Person' : 'Sales Leader';
    const managerId = role === 'Sales Leader' ? id : undefined;
    const response = await fetch(process.env.NEXT_PUBLIC_APP_URL+'/api/sales-team/create-account', { method: 'POST', body: JSON.stringify({userId:username, password, role:accountRole, managerId })})
    if(response.ok){
        const result = await response.json();
        if(result.message === 'Account created successfully'){
            setIsOpen(false); // Close the modal after successful creation (optional)
        }else {
            alert(result.message);
        }
    }else {
      console.log(response);
      alert('User not created');
    }
  };

  return (
    <>
      {isOpen && ( // Conditionally render the modal only when isOpen is true
      <div className='absolute top-0 left-0 right-0 bottom-0'>
        <div className='absolute top-0 left-0 right-0 bottom-0' onClick={()=>{setIsOpen(false)}}></div>
        <div className="modal z-[5] absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-white p-4 rounded-sm shadow-xl">
          <div className="modal-content flex flex-col items-center gap-2">
            <h2 className="modal-title text-blue-600 w-full">Create Account</h2>
            <form className='flex flex-col gap-1' onSubmit={handleCreateAccount}>
              {/* Add your form fields for creating an account */}
              <label className='text-gray-400 text-sm' htmlFor="username">Username:</label>
              <input className="outline-none border-gray-400 border-[1px] p-2 rounded-sm" type="text" id="username" name="username" value={username} onChange={e=>setUsername(e.target.value)} required />
              {/* <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required /> */}
              <label className='text-gray-400 text-sm' htmlFor="password">Password:</label>
              <input className="outline-none border-gray-400 border-[1px] p-2 rounded-sm" type="text" id="password" name="password" value={password} onChange={e=>setPassword(e.target.value)} required />
              <button className='bg-blue-600 text-white p-2 w-full rounded-sm mt-4' type="submit">Create Account</button>
            </form>
              <button className="modal-close text-gray-400 text-sm" onClick={handleClose}>
                Close
              </button>
          </div>
        </div>
      </div>
      )}
    </>
  );
};