import React from 'react';
import { Button, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { CategoryNode } from './types';
import { flatDataUtils } from '@/services/mockSkillData';

interface ExcelExportButtonProps {
  categories: CategoryNode[];
}

const ExcelExportButton: React.FC<ExcelExportButtonProps> = ({ categories }) => {
  const flattenCategories = (nodes: CategoryNode[]): CategoryNode[] => {
    let result: CategoryNode[] = [];
    nodes.forEach(node => {
      result.push(node);
      if (node.children && node.children.length > 0) {
        result = result.concat(flattenCategories(node.children));
      }
    });
    return result;
  };

  const exportToExcel = () => {
    try {
      // Tạo workbook mới
      const wb = XLSX.utils.book_new();
      
      // Chuẩn bị dữ liệu cho sheet
      const exportData: any[][] = [];
      const merges: any[] = [];
      
      // Tìm số cấp độ tối đa sử dụng utility function
      const maxLevel = flatDataUtils.getMaxLevel(flattenCategories(categories));
      const totalColumns = maxLevel + 4; // maxLevel cấp + STT + Mã + Cấp độ kỹ năng + Yêu cầu chi tiết
      
      // Header chính
      const mainHeader = ['BÁO CÁO CÂY PHÂN CẤP KỸ NĂNG'];
      for (let i = 1; i < totalColumns; i++) {
        mainHeader.push('');
      }
      exportData.push(mainHeader);

      // Thông tin tổng quan
      const now = new Date();
      const infoRow = [
        `Ngày xuất: ${now.toLocaleDateString('vi-VN')}`,
        '',
        '',
        ''
      ];
      const totalCategoriesText = `Tổng số danh mục: ${flattenCategories(categories).length}`;
      const remainingCols = totalColumns - 4;
      infoRow.push(totalCategoriesText);
      for (let i = 1; i < remainingCols; i++) {
        infoRow.push('');
      }
      exportData.push(infoRow);
      
      // Dòng trống
      const emptyRow = [];
      for (let i = 0; i < totalColumns; i++) {
        emptyRow.push('');
      }
      exportData.push(emptyRow);
      
      // Sub headers theo cấp độ
      const subHeaders = ['STT'];
      for (let level = 1; level <= maxLevel; level++) {
        subHeaders.push(`Cấp ${level}`);
      }
      subHeaders.push('Mã danh mục');
      subHeaders.push('Cấp độ kỹ năng');
      subHeaders.push('Yêu cầu chi tiết');
      exportData.push(subHeaders);

      let rowIndex = 4; // Bắt đầu từ dòng thứ 5 (index 4)
      let sttCounter = 1;

      // Hàm đệ quy để xuất dữ liệu theo cấu trúc cây với merge cells theo cấp độ
      const exportNodeData = (nodes: CategoryNode[], parentPath: string[] = []) => {
        nodes.forEach(node => {
          const nodeStartRow = rowIndex;
          const currentPath = [...parentPath, node.name];
          
          // Tính tổng số dòng mà node này sẽ chiếm (bao gồm children)
          const calculateNodeRows = (n: CategoryNode): number => {
            let rows = 0;
            if (n.details && n.details.length > 0) {
              rows += n.details.length;
            } else if (!n.children || n.children.length === 0) {
              rows += 1; // Leaf node không có details vẫn chiếm 1 dòng
            }
            
            if (n.children && n.children.length > 0) {
              n.children.forEach(child => {
                rows += calculateNodeRows(child);
              });
            }
            
            return rows;
          };
          
          const totalRows = calculateNodeRows(node);
          
          if (node.details && node.details.length > 0) {
            // Node có chi tiết
            node.details.forEach((detail, detailIndex) => {
              const requirements = detail.requirements
                .map((req, idx) => `${idx + 1}. ${req.value}`)
                .join('\n');
              
              // Tạo row data với các cấp độ
              const rowData: any[] = [detailIndex === 0 ? sttCounter++ : '']; // STT
              
              // Thêm dữ liệu cho từng cấp độ
              for (let level = 1; level <= maxLevel; level++) {
                if (detailIndex === 0 && level === node.level) {
                  rowData.push(node.name);
                } else {
                  rowData.push('');
                }
              }
              
              // Thêm các cột cuối - mã danh mục chỉ hiển thị cho detail đầu tiên
              rowData.push(detailIndex === 0 ? (node.code || '') : ''); // Mã danh mục
              rowData.push(detail.skill_level); // Cấp độ kỹ năng
              rowData.push(requirements); // Yêu cầu chi tiết
              
              exportData.push(rowData);
              rowIndex++;
            });
          } else if (!node.children || node.children.length === 0) {
            // Leaf node không có chi tiết
            const rowData: any[] = [sttCounter++]; // STT
            
            // Thêm dữ liệu cho từng cấp độ
            for (let level = 1; level <= maxLevel; level++) {
              if (level === node.level) {
                rowData.push(node.name);
              } else {
                rowData.push('');
              }
            }
            
            // Thêm các cột cuối
            rowData.push(node.code || ''); // Mã danh mục
            rowData.push('Chưa có'); // Cấp độ kỹ năng
            rowData.push('Chưa có yêu cầu'); // Yêu cầu chi tiết
            
            exportData.push(rowData);
            rowIndex++;
          } else if (node.children && node.children.length > 0) {
            // Node cha có children - không tạo dòng riêng, chỉ merge qua children
            // Không tạo dòng cho node cha, chỉ xuất children
          }
          
          // Xuất children
          if (node.children && node.children.length > 0) {
            exportNodeData(node.children, currentPath);
          }
          
          // Merge cells cho node cha nếu có children (không có details riêng)
          if (node.children && node.children.length > 0 && (!node.details || node.details.length === 0)) {
            const endRow = nodeStartRow + totalRows - 1;
            const levelColumnIndex = node.level; // Cột của cấp độ này
            
            // Merge cột cấp độ tương ứng cho node cha
            merges.push({ s: { r: nodeStartRow, c: levelColumnIndex }, e: { r: endRow, c: levelColumnIndex } });
            
            // Đặt tên node cha vào dòng đầu tiên của children
            if (exportData[nodeStartRow]) {
              exportData[nodeStartRow][levelColumnIndex] = node.name;
            }
          }
          
          // Merge cells cho node có nhiều details
          if (node.details && node.details.length > 1) {
            const endRow = nodeStartRow + node.details.length - 1;
            const levelColumnIndex = node.level;
            const codeColumnIndex = maxLevel + 1;
            
            // Merge STT
            if (exportData[nodeStartRow] && exportData[nodeStartRow][0] !== '') {
              merges.push({ s: { r: nodeStartRow, c: 0 }, e: { r: endRow, c: 0 } });
            }
            
            // Merge cột cấp độ tương ứng
            if (exportData[nodeStartRow] && exportData[nodeStartRow][levelColumnIndex] !== '') {
              merges.push({ s: { r: nodeStartRow, c: levelColumnIndex }, e: { r: endRow, c: levelColumnIndex } });
            }
            
            // Merge Mã danh mục chỉ cho node có nhiều details
            if (node.code && node.code !== '') {
              merges.push({ s: { r: nodeStartRow, c: codeColumnIndex }, e: { r: endRow, c: codeColumnIndex } });
            }
          }
        });
      };

      // Xuất dữ liệu
      exportNodeData(categories);
      
      // Tạo worksheet
      const ws = XLSX.utils.aoa_to_sheet(exportData);
      
      // Merge header chính và thông tin tổng quan
      merges.unshift(
        { s: { r: 0, c: 0 }, e: { r: 0, c: totalColumns - 1 } }, // Header chính
        { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } }, // Ngày xuất
        { s: { r: 1, c: 4 }, e: { r: 1, c: totalColumns - 1 } }  // Tổng số danh mục
      );
      
      ws['!merges'] = merges;
      
      // Thiết lập độ rộng cột động
      const colWidths = [{ width: 8 }]; // STT
      
      // Độ rộng cho các cột cấp độ
      for (let level = 1; level <= maxLevel; level++) {
        colWidths.push({ width: 25 }); // Cấp 1, 2, 3...
      }
      
      // Các cột cuối
      colWidths.push({ width: 15 }); // Mã danh mục
      colWidths.push({ width: 18 }); // Cấp độ kỹ năng
      colWidths.push({ width: 60 }); // Yêu cầu chi tiết
      
      ws['!cols'] = colWidths;
      
      // Thiết lập style
      const headerStyle = {
        font: { bold: true, sz: 16, color: { rgb: 'FFFFFF' } },
        alignment: { horizontal: 'center', vertical: 'center' },
        fill: { fgColor: { rgb: '1976D2' } },
        border: {
          top: { style: 'thin', color: { rgb: '000000' } },
          bottom: { style: 'thin', color: { rgb: '000000' } },
          left: { style: 'thin', color: { rgb: '000000' } },
          right: { style: 'thin', color: { rgb: '000000' } }
        }
      };
      
      const infoStyle = {
        font: { bold: true, sz: 11 },
        alignment: { horizontal: 'left', vertical: 'center' },
        fill: { fgColor: { rgb: 'E3F2FD' } }
      };
      
      const subHeaderStyle = {
        font: { bold: true, sz: 12, color: { rgb: 'FFFFFF' } },
        alignment: { horizontal: 'center', vertical: 'center' },
        fill: { fgColor: { rgb: '424242' } },
        border: {
          top: { style: 'thin', color: { rgb: '000000' } },
          bottom: { style: 'thin', color: { rgb: '000000' } },
          left: { style: 'thin', color: { rgb: '000000' } },
          right: { style: 'thin', color: { rgb: '000000' } }
        }
      };
      
      const dataStyle = {
        alignment: { horizontal: 'left', vertical: 'top', wrapText: true },
        border: {
          top: { style: 'thin', color: { rgb: 'CCCCCC' } },
          bottom: { style: 'thin', color: { rgb: 'CCCCCC' } },
          left: { style: 'thin', color: { rgb: 'CCCCCC' } },
          right: { style: 'thin', color: { rgb: 'CCCCCC' } }
        }
      };
      
      const levelStyles = [
        { fill: { fgColor: { rgb: 'FFF3E0' } } }, // Cấp 1 - cam nhạt
        { fill: { fgColor: { rgb: 'E8F5E8' } } }, // Cấp 2 - xanh lá nhạt  
        { fill: { fgColor: { rgb: 'F3E5F5' } } }, // Cấp 3 - tím nhạt
      ];
      
      // Áp dụng style cho header chính
      for (let col = 0; col < totalColumns; col++) {
        const cellRef = XLSX.utils.encode_cell({ r: 0, c: col });
        if (!ws[cellRef]) ws[cellRef] = { v: '' };
        ws[cellRef].s = headerStyle;
      }
      
      // Áp dụng style cho thông tin tổng quan
      for (let col = 0; col < totalColumns; col++) {
        const cellRef = XLSX.utils.encode_cell({ r: 1, c: col });
        if (!ws[cellRef]) ws[cellRef] = { v: '' };
        ws[cellRef].s = infoStyle;
      }
      
      // Áp dụng style cho sub header
      for (let col = 0; col < totalColumns; col++) {
        const cellRef = XLSX.utils.encode_cell({ r: 3, c: col });
        if (!ws[cellRef]) ws[cellRef] = { v: '' };
        ws[cellRef].s = subHeaderStyle;
      }
      
      // Áp dụng style cho dữ liệu
      for (let row = 4; row < exportData.length; row++) {
        for (let col = 0; col < totalColumns; col++) {
          const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
          if (!ws[cellRef]) continue;
          
          // Style cơ bản
          ws[cellRef].s = { ...dataStyle };
          
          // Style theo cấp độ - kiểm tra các cột cấp độ
          for (let level = 1; level <= maxLevel; level++) {
            const levelColIndex = level; // Cột cấp độ (STT = 0, Cấp 1 = 1, Cấp 2 = 2, ...)
            if (col === levelColIndex && exportData[row][levelColIndex] !== '') {
              const levelStyleIndex = Math.min(level - 1, levelStyles.length - 1);
              ws[cellRef].s = { 
                ...dataStyle, 
                ...levelStyles[levelStyleIndex],
                font: { bold: true }
              };
              break;
            }
          }
          
          // Style cho STT
          if (col === 0 && exportData[row][0] !== '') {
            ws[cellRef].s = {
              ...ws[cellRef].s,
              alignment: { horizontal: 'center', vertical: 'center' },
              font: { bold: true }
            };
          }
        }
      }
      
      // Thiết lập chiều cao dòng
      ws['!rows'] = [
        { hpt: 25 }, // Header
        { hpt: 20 }, // Info
        { hpt: 15 }, // Empty
        { hpt: 20 }, // Sub header
      ];
      
      // Thêm worksheet vào workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Cây phân cấp kỹ năng');
      
      // Tạo tên file với timestamp
      const timestamp = now.toISOString().slice(0, 19).replace(/[:-]/g, '');
      const fileName = `Bao_cao_cay_phan_cap_ky_nang_${timestamp}.xlsx`;
      
      // Xuất file
      XLSX.writeFile(wb, fileName);
      
      message.success('Xuất Excel thành công!');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      message.error('Có lỗi xảy ra khi xuất Excel');
    }
  };

  return (
    <Button
      type="primary"
      icon={<DownloadOutlined />}
      onClick={exportToExcel}
      size="large"
    >
      Xuất Excel
    </Button>
  );
};

export default ExcelExportButton;
