import {Pagination, SelectChangeEvent} from "@mui/material"
import "./customPagination.css"

type CustomPaginationPropsType = {
    countPagesNumber: number,
    currentPage: number,
    handleChangePageNumber: (e: React.ChangeEvent<unknown>, p: number) => void
}

function CustomPagination({countPagesNumber, currentPage, handleChangePageNumber}: CustomPaginationPropsType) {
    return (
        <div className="pagination_list">
            <Pagination
                variant="outlined"
                shape="rounded"
                count={countPagesNumber}
                page={currentPage}
                onChange={(e, p) => handleChangePageNumber(e, p)}
            />
        </div>
    )
}

export default CustomPagination