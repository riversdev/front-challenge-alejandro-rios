import { useState } from 'react'
import Component from './components/MoveableComponent'
import Navbar from './components/Navbar'
import { useFetchApi } from './hooks/FetchApi'
import './styles.css'

const App = () => {
  const [moveableComponents, setMoveableComponents] = useState([])
  const [selected, setSelected] = useState(null)
  const { images, loading, error } = useFetchApi()

  const addMoveable = () => {
    // Create a new moveable component and add it to the array
    const COLORS = ['red', 'blue', 'yellow', 'green', 'purple']
    const FITS = ['fill', 'contain', 'cover', 'none', 'scale-down']

    setMoveableComponents([
      ...moveableComponents,
      {
        id: Math.floor(Math.random() * Date.now()),
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        updateEnd: true,
        fit: FITS[Math.floor(Math.random() * FITS.length)]
      },
    ])
  }

  const updateMoveable = (id, newComponent, updateEnd = false) => {
    const updatedMoveables = moveableComponents.map((moveable, i) => {
      if (moveable.id === id) {
        return { id, ...newComponent, updateEnd }
      }
      return moveable
    })
    setMoveableComponents(updatedMoveables)
  }

  const handleResizeStart = (index, e) => {
    console.log('e', e.direction)
    // Check if the resize is coming from the left handle
    const [handlePosX, handlePosY] = e.direction
    // 0 => center
    // -1 => top or left
    // 1 => bottom or right

    // -1, -1
    // -1, 0
    // -1, 1
    if (handlePosX === -1) {
      console.log('width', moveableComponents, e)
      // Save the initial left and width values of the moveable component
      const initialLeft = e.left
      const initialWidth = e.width

      // Set up the onResize event handler to update the left value based on the change in width
    }
  }

  const deleteSelected = id => {
    const updatedMoveables = moveableComponents.filter(moveable => moveable.id !== id)

    setMoveableComponents(updatedMoveables)
  }

  if (error !== null)
    return <p>error api</p>

  if (loading)
    return null

  return (
    <>
      <Navbar >
        <button className='button' onClick={addMoveable}>Add Moveable</button>
      </Navbar>
      <main className='main'>
        <div
          id='parent'
          style={{
            position: 'relative',
            background: 'black',
            height: '80vh',
            width: '80vw',
          }}
        >
          {moveableComponents.map((item, index) => (
            <Component
              {...item}
              key={index}
              updateMoveable={updateMoveable}
              handleResizeStart={handleResizeStart}
              setSelected={setSelected}
              isSelected={selected === item.id}
              image={images[index]}
              deleteSelected={deleteSelected}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export default App