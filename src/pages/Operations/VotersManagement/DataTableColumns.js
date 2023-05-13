import {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	UncontrolledDropdown
} from "reactstrap";
import { filteredColumns } from "../../../helpers/Filter/FilterColumns";


export const columns = (columnNames, i18n,t, onActiveOrDeactiveChange) => {
	return filteredColumns(columnNames, i18n)?.map((column) => {
		
		let col;
		switch (column?.FieldName) {
		
			case 'Active':
				return col = {
					name: <span className='font-weight-bold fs-13'>{i18n.language === 'ar' ? column?.ValueAr : column?.ValueEn}</span>,
					sortable: false,
					wrap: true,
					selector: (cell) => {
						return <div className="form-check form-switch">
							<input className="form-check-input" 
							type="checkbox" 
							role="switch" 
							id="flexSwitchCheckDefault"
							onChange={(e) => onActiveOrDeactiveChange(cell,e)}
							checked={cell?.Voters_Status} />
							<label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
						</div>

					},
				}

			// case 'Action':
			// 	return col = {
			// 		name: <span className='font-weight-bold fs-13'>{i18n.language === 'ar' ? column?.ValueAr : column?.ValueEn}</span>,
			// 		sortable: false,
			// 		wrap: true,
			// 		cell: (cell) => {
			// 			return (
			// 				<UncontrolledDropdown className="dropdown d-inline-block">
			// 					<DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button">
			// 						<i className="ri-more-fill align-middle"></i>
			// 					</DropdownToggle>
			// 					<DropdownMenu className="dropdown-menu-end">
			// 						{/* <DropdownItem href="#!"><i className="ri-eye-fill align-bottom me-2 text-muted"></i>{t('View')}</DropdownItem> */}
			// 						<DropdownItem className='edit-item-btn' onClick={(e) => { onEditClickHandler(cell, 'isEdit') }}><i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{t('Edit')}</DropdownItem>
			// 						<DropdownItem className='remove-item-btn' onClick={(e) => { onDeleteClickHandler(cell) }}> <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> {t('Delete')} </DropdownItem>
			// 					</DropdownMenu>
			// 				</UncontrolledDropdown>
			// 			);
			// 		},
			// 	}
			
			default:
				return col = {
					name: <span className='font-weight-bold fs-13'>{i18n.language === 'ar' ? column?.ValueAr : column?.ValueEn}</span>,
					selector: row => {
						return ['CreatedDate', 'ModifiedDate'].includes(column?.Title) ? new Date(row[column?.Title]).toDateString() : row[column?.Title]
					},
					sortable: true,
					wrap: true
				}
		}
	})
}