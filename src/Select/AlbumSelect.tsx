import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import React from "react";

type AlbumSelectP = {
    selectedValue: number,
    handleChangeAlbumId: (event: SelectChangeEvent) => void,
    albumId: number[],
}

function AlbumSelect({selectedValue, handleChangeAlbumId, albumId}: AlbumSelectP) {
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
                        <MenuItem value={999999}>
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


// @ts-ignore
export default AlbumSelect