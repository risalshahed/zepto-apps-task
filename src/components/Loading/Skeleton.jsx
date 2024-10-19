const Skeleton = ({ width, height }) => {
  const style = {
    width, height
  }
  return <div className='loading-skeleton' style={style}></div>
}

export default Skeleton;