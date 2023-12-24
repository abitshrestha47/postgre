import React from 'react'

const CategoryForm = ({name,setName,description,setDescription,handleSubmit}) => {
  return (
    <>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <input type="text" className="form-control" placeholder='enter new category . . .' value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className="mb-3">
            <input type="text" className="form-control" placeholder='enter description . . .' value={description} onChange={(e)=>setDescription(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>
  )
}

export default CategoryForm 