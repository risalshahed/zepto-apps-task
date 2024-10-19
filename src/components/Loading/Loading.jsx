import Navbar from "../Navbar";
import SearchFilter from "../SearchFilter";
import Skeleton from "./Skeleton";

const skeletons = (
  <div>
    <Skeleton width='200px' height='150px' />
    <Skeleton width='200px' height='40px' />
    <Skeleton width='200px' height='25px' />
  </div>
)

const Loading = () => {
  return (
    <div>
      <Navbar />
      <SearchFilter />
      <div id='parent-skeletons'>
        { skeletons }
        { skeletons }
        { skeletons }
        { skeletons }
        { skeletons }
        { skeletons }
        { skeletons }
        { skeletons }
      </div>
    </div>
  )
}

export default Loading;