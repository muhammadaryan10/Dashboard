import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AddNewUser() {
    const Navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        age: "",
        city:"",
      });
    let value, name;                  
      const getUserdata = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
        console.log(user);
      };
      const sendData = async (e) => {
        e.preventDefault();
        const { name, email, phone, city,age} = user;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            city:city,
            age: age,
          }),
        };
        if (name && email && phone ) {
          const response = await fetch(
            "http://localhost:5000/Usermanage/add",
            options
          );
          console.log(response);
          if (response.status===200) {
            alert("User has been added ");
            Navigate("/Users"); 
          }
        } else {
          alert("Please Fill All the feilds ");
        }
      };
    return (
        <div>
            <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Add New User</h1>
                </div>

                <form action="" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    <div>
                        <label htmlFor="name" className="sr-only">Name</label>

                        <div className="relative">
                            <input
                            onChange={getUserdata}
                                type="string"
                                className="w-full border rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter  Name"
                                name='name'
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>

                        <div className="relative">
                            <input
                            onChange={getUserdata}
                                type="email"
                                className="w-full border rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter email"
                                name='email'
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="phone" className="sr-only">Phone</label>

                        <div className="relative">
                            <input
                            onChange={getUserdata}
                                type="number"
                                className="w-full border rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter phone"
                                name='phone'
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="city" className="sr-only">City</label>

                        <div className="relative">
                            <input
                            onChange={getUserdata}
                                type="string"
                                className="w-full border rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter City"
                                name='city'
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="age" className="sr-only">Age</label>

                        <div className="relative">
                            <input
                            onChange={getUserdata}
                                type="number"
                                className="w-full border rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter age"
                                name='age'
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            onClick={sendData}
                            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
