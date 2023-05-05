import React, {useState, useEffect} from 'react';
import NewRev from './rating_components/new_rev.jsx';
import ProductBreakdown from './rating_components/product_breakdown.jsx';
import RatingBreakdown from './rating_components/rating_breakdown.jsx';
import RevList from './rating_components/rev_list.jsx';
import SortOptions from './rating_components/sort_options.jsx';


var Reviews = () => {

// on render set initial state with the current product ID.

  return (
    <div>
      <div className = 'revList'><RevList/></div>
      <div className = 'sortOptions'><SortOptions/></div>
      <div className = 'ratingBreakdown'><RatingBreakdown/></div>
      <div className = 'productBreakdown'><ProductBreakdown/></div>
      <div className = 'newRev'><NewRev/></div>
    </div>
  )
}