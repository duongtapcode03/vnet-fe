import { message } from 'antd';

export interface ApiError {
  status?: number;
  message?: string;
  data?: {
    message?: string;
    errors?: Array<{
      field: string;
      message: string;
    }>;
  };
}

export const handleApiError = (error: ApiError, defaultMessage: string = 'Có lỗi xảy ra') => {
  console.error('API Error:', error);
  
  // Xử lý các loại lỗi HTTP status
  if (error?.status === 400) {
    // Lỗi validation từ server
    if (error?.data?.message) {
      message.error(`Lỗi dữ liệu: ${error.data.message}`);
    } else if (error?.data?.errors) {
      // Hiển thị các lỗi validation cụ thể
      const validationErrors = error.data.errors;
      if (Array.isArray(validationErrors)) {
        validationErrors.forEach((err) => {
          message.error(`${err.field}: ${err.message}`);
        });
      } else {
        message.error('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại');
      }
    } else {
      message.error('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại');
    }
  } else if (error?.status === 401) {
    message.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại');
  } else if (error?.status === 403) {
    message.error('Bạn không có quyền thực hiện thao tác này');
  } else if (error?.status === 404) {
    message.error('Dữ liệu không tồn tại hoặc đã bị xóa');
  } else if (error?.status === 409) {
    message.error('Dữ liệu đã tồn tại. Vui lòng kiểm tra lại');
  } else if (error?.status >= 500) {
    message.error('Lỗi server. Vui lòng thử lại sau');
  } else if (error?.message) {
    message.error(`Lỗi: ${error.message}`);
  } else {
    message.error(defaultMessage);
  }
};

export const handleApiSuccess = (successMessage: string) => {
  message.success(successMessage);
};

export const handleApiWarning = (warningMessage: string) => {
  message.warning(warningMessage);
};

// Utility để retry API call
export const retryApiCall = async <T>(
  apiCall: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: any;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;
      
      if (i < maxRetries - 1) {
        console.warn(`API call failed, retrying in ${delay}ms... (${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
      }
    }
  }
  
  throw lastError;
};

