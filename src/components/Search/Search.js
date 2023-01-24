import React from "react";
import { useState } from "react";
import { GEO_URL_API, geoApiOptions } from "../../api";
import { AsyncPaginate } from "react-select-async-paginate";
import "./Search.css";

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        return fetch(
            `${GEO_URL_API}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
            geoApiOptions
        )
            .then((response) => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        };
                    }),
                };
            })
            .catch((err) => console.error(err));
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    return (
        <div className="wrap__search">
            <span>Find Your Location</span>
            <div className="search__box">

            <AsyncPaginate
            className="react-select-container"
            classNamePrefix="react-select"
                placeholder="Enter location"
                debounceTimeout={600}
                value={search}
                onChange={handleOnChange}
                loadOptions={loadOptions}
            />
            </div>
        </div>
    );
};

export default Search;
