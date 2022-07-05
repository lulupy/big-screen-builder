import React from 'react';
import { IItem } from '../../../../../../item';
import AddFilter from './AddFilter';
import FilterItem from './FilterItem';

interface IFilterConfigProps {
  item: IItem,
}

const FilterConfig = ({ item }: IFilterConfigProps) => {
  const [filters, setFilters] = React.useState(item.getDataConfigValue().filters);
  const handleAddFilter = React.useCallback((code: string) => {
    item.addFilter(code);
    setFilters([...item.getDataConfigValue().filters]);
  }, [item, setFilters]);

  const handleChangFilter = React.useCallback((index: number, code: string) => {
    item.changeFilter(index, code);
    setFilters([...item.getDataConfigValue().filters]);
  }, [item, setFilters]);

  const handleRemoveFilter = React.useCallback((index: number) => {
    item.removeFilter(index);
    setFilters([...item.getDataConfigValue().filters]);
  }, [item, setFilters]);

  return (
    <>
      <div className='data-config__title'>
        <span>过滤器:</span>
      </div>


      {filters.map((filter, index) => {
        return (
          <FilterItem
            name={`filter${index+1}`}
            filter={filter}
            onOk={handleChangFilter.bind(null, index)}
            onRemove={handleRemoveFilter.bind(null, index)}
          />
        )
      })}
      <AddFilter onOk={handleAddFilter}></AddFilter>
    </>
  );
}

export default React.memo(FilterConfig);