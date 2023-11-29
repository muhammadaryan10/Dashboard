import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Radio } from '@mui/material';


export default function AddNewUser() {
    const Navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        age: "",
        city: "",
        courses:""
    });

    let value, name;
    const getUserdata = (e) => {
        name = e.target.name;
        value = e.target.value;
        if (name === 'courses') {
            const { checked, value } = e.target;
            setUser((prevUser) => {
              if (checked) {
                // Add the course to the array
                return { ...prevUser, [name]: [...prevUser[name], value] };
              } else {
                // Remove the course from the array
                const updatedCourses = prevUser[name].filter(course => course !== value);
                return { ...prevUser, [name]: updatedCourses };
              }
            });
          } else {
            setUser({ ...user, [name]: value });
          }
        console.log(user);
    };

    const sendData = async (e) => {
        e.preventDefault();
        const { name, email, phone, city, age ,courses } = user;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                city: city,
                age: age,
                courses:courses
            }),
        };
        if (name && email && phone) {
            const response = await fetch(
                "http://localhost:5000/Usermanage/add",
                options
            );
            console.log(response);
            if (response.status === 200) {
                alert("User has been added ");
                Navigate("/Users");
            }
            else if (response.status === 400) {
                alert("Email is already exist  ");
            }
        } else {
            alert("Please Fill All the feilds ");
        }
    };

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    }

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
                    <FormControl sx={{ minWidth: 120 }} fullWidth>
                        <InputLabel id="demo-controlled-open-select-label">City</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            label="Age"
                            onChange={getUserdata}
                            name='city'
                        >

                            <MenuItem value="Karachi">Karachi</MenuItem>
                            <MenuItem value="Lahore">Lahore</MenuItem>
                            <MenuItem value="Multan">Multan</MenuItem>
                        </Select>
                    </FormControl>
                    <div className="d-flex ">
                        <input className="form-check-input" type="radio" name="age" onChange={getUserdata} id="flexRadioDefault1" value={20} />
                        <label className="form-check-label ml-2" for="flexRadioDefault1">
                            Less then 18
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="age" onChange={getUserdata} id="flexRadioDefault2" value={18} />
                        <label className="form-check-label ml-2" for="flexRadioDefault2" >
                            If above 18
                        </label>
                    </div>
                    <div className='d-flex'>
                    <div className="form-check my-1">
                        <h1 className='my-2 text-2xl font-bold'>Select Courses</h1>
                        <input className="form-check-input" type="checkbox" name="courses" onChange={getUserdata} value="OOPS" id="defaultCheck1" />
                        <label className="form-check-label ml-2" for="defaultCheck1">
                            OOPS
                        </label>
                    </div>
                    <div className="form-check my-1">
                        <input className="form-check-input" type="checkbox" name="courses" onChange={getUserdata} value="DBMS" id="defaultCheck2" />
                        <label className="form-check-label ml-2" for="defaultCheck2">
                            DBMS
                        </label>
                    </div>
                    <div className="form-check my-1">
                        <input className="form-check-input" type="checkbox" name="courses" onChange={getUserdata} value="FOP" id="defaultCheck3" />
                        <label className="form-check-label ml-2" for="defaultCheck3"> 
                           FOP
                        </label>
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
            </div >
        </div >
    )
}
