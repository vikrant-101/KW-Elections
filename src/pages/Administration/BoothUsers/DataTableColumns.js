
import { t } from "i18next";
import { Input } from "reactstrap";
import { filteredColumns } from "../../../helpers/Filter/FilterColumns";


export const columns = (columnNames, i18n , onMobileNumberBlurHandler, onFullNameBlurHandler) => {
	return filteredColumns(columnNames, i18n)?.map((column) => {
		let col;
		switch (column?.FieldName) {
		
			case 'Mobile_Number':
				return col = {
					name: <span className='font-weight-bold fs-13'>{i18n.language === 'ar' ? column?.ValueAr : column?.ValueEn}</span>,
					sortable: false,
					wrap: true,
					selector: (cell) => {
						return <div className="form" >
							<input type="number" 
							placeholder="Enter Number"
							onBlur={(e)=>{onMobileNumberBlurHandler(e)}}
							/>
						</div>

					},
				}

			default:
				return col = {
					name: <span className='font-weight-bold fs-13'>{i18n.language === 'ar' ? column?.ValueAr : column?.ValueEn}</span>,
					selector: row => {
						return ['CreatedDate', 'ModifiedDate'].includes(column?.Title) ? new Date(row[column?.Title]).toDateString() : column?.Title === 'MobileNumber'?(<div className="form" >
						<Input type="text" 
						placeholder={t('Enter Mobile Number')}
						defaultValue={row.MobileNumber}
						onBlur={(e)=>{onMobileNumberBlurHandler(e, row)}}
						/>
					</div>): column?.Title === 'FullNameEnglish' ? (<div className="form" >
						<Input type="text" 
						placeholder={t('Enter Full Name')}
						defaultValue={row.FullNameEnglish}
						onBlur={(e)=>{onFullNameBlurHandler(e,row)}}
						/>
					</div>): row[column?.Title]
					},
					sortable: true,
					wrap: true
				}
		}
	})
}