import { useEffect, useRef, useState } from 'react'
import { setFilter } from '../store/actions/shop.actions'
import { HiSortAscending, HiSortDescending } from 'react-icons/hi'

export function ShopFilter() {
   const [filterBy, setFilterBy] = useState({ txt: '', sortBy: '', sortDir: 1 })
   const debounce = useRef(null)

   useEffect(() => {
      clearTimeout(debounce.current)
      debounce.current = setTimeout(() => {
         setFilter(filterBy)
      }, 250)
      return () => {
         clearTimeout(debounce.current)
      }
   }, [filterBy])

   function handleChange(ev) {
      const field = ev.target.name
      const value = ev.target.value
      switch (field) {
         case 'sortDir':
            return setFilterBy({
               ...filterBy,
               [field]: ev.target.checked ? -1 : 1,
            })
         default:
            setFilterBy({ ...filterBy, [field]: value })
            break
      }
   }

   const { txt, sortBy, sortDir } = filterBy
   return (
      <section className='shop-filter'>
         <input
            type='text'
            name='txt'
            value={txt}
            onChange={handleChange}
            placeholder='Search...'
         />

         <div className='sort-header'>
            <h2>Sort by</h2>
            <label htmlFor='sortDir'>
               {sortDir === 1 ? <HiSortAscending /> : <HiSortDescending />}
            </label>
            <input
               type='checkbox'
               id='sortDir'
               name='sortDir'
               value={sortDir}
               onChange={handleChange}
            />
         </div>
        
         <select
            className='sort-by'
            name='sortBy'
            value={sortBy}
            onChange={handleChange}>
            <option value='price'>Price</option>
            <option value='name'>Name</option>
         </select>
      </section>
   )
}
