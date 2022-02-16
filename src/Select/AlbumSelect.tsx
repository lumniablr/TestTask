import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import React from "react";
import "./albumSelect.css"

type AlbumSelectPropsType = {
    selectedValue: number | string,
    handleChangeAlbumId: (event: SelectChangeEvent) => void,
    albumId: number[],
}

function AlbumSelect({
                         selectedValue,
                         handleChangeAlbumId,
                         albumId
                     }: AlbumSelectPropsType) {
    return (
        <div className='select_list'>
            <Box sx={{minWidth: 199}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        Select ID
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedValue.toString()}
                        label="Album ID"
                        onChange={handleChangeAlbumId}
                    >
                        <MenuItem value={'ALL'}>
                            ALL
                        </MenuItem>
                        {albumId.map((id) =>
                            <MenuItem key={id} value={id}>
                                {id}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Box>
        </div>
    )
}

export default AlbumSelect