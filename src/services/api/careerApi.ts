import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseApi } from "./baseApi";
import { 
  CareerPath, 
  UserProfile, 
  CareerPosition, 
  PositionTransferRequest,
  CareerHistory 
} from "@/types/career";
import { 
  mockCareerPath, 
  getUserProfile, 
  getPositionById, 
  getCareerPath,
  getTransferRequests,
  mockPositions,
  mockUserProfiles
} from "@/data/mockCareerData";

export const careerApi = createApi({
    reducerPath: 'careerApi',
    baseQuery: createBaseApi('http://192.168.150.45:8090/api/career'),
    tagTypes: ['CareerPath', 'UserProfile', 'CareerPosition', 'PositionTransfer'],
    endpoints: (builder) => ({
        // Get career path for specific field
        getCareerPath: builder.query<CareerPath, string>({
            queryFn: async (field) => {
                const careerPath = getCareerPath(field);
                if (!careerPath) {
                    return { error: { status: 404, data: 'Career path not found' } };
                }
                return { data: careerPath };
            },
            providesTags: ['CareerPath'],
        }),
        
        // Get user profile
        getUserProfile: builder.query<UserProfile, string>({
            queryFn: async (userId) => {
                const profile = getUserProfile(userId);
                if (!profile) {
                    return { error: { status: 404, data: 'User profile not found' } };
                }
                return { data: profile };
            },
            providesTags: ['UserProfile'],
        }),
        
        // Get all available positions
        getPositions: builder.query<CareerPosition[], void>({
            queryFn: async () => {
                return { data: mockPositions };
            },
            providesTags: ['CareerPosition'],
        }),
        
        // Get position details
        getPositionDetails: builder.query<CareerPosition, string>({
            queryFn: async (positionId) => {
                const position = getPositionById(positionId);
                if (!position) {
                    return { error: { status: 404, data: 'Position not found' } };
                }
                return { data: position };
            },
            providesTags: ['CareerPosition'],
        }),
        
        // Create user profile
        createUserProfile: builder.mutation<UserProfile, Partial<UserProfile>>({
            queryFn: async (profileData) => {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const newProfile: UserProfile = {
                    id: `profile-${Date.now()}`,
                    userId: profileData.userId || 'new-user',
                    currentPosition: undefined,
                    careerHistory: [],
                    skills: profileData.skills || [],
                    experience: profileData.experience || 0,
                    education: profileData.education || '',
                    certifications: profileData.certifications || []
                };
                
                return { data: newProfile };
            },
            invalidatesTags: ['UserProfile'],
        }),
        
        // Update user profile
        updateUserProfile: builder.mutation<UserProfile, { userId: string; profile: Partial<UserProfile> }>({
            queryFn: async ({ userId, profile }) => {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const existingProfile = getUserProfile(userId);
                if (!existingProfile) {
                    return { error: { status: 404, data: 'User profile not found' } };
                }
                
                const updatedProfile = { ...existingProfile, ...profile };
                return { data: updatedProfile };
            },
            invalidatesTags: ['UserProfile'],
        }),
        
        // Request position transfer
        requestPositionTransfer: builder.mutation<PositionTransferRequest, Omit<PositionTransferRequest, 'status'>>({
            queryFn: async (requestData) => {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const newRequest: PositionTransferRequest = {
                    id: `transfer-${Date.now()}`,
                    userId: requestData.userId,
                    fromPositionId: requestData.fromPositionId,
                    toPositionId: requestData.toPositionId,
                    reason: requestData.reason,
                    requestedDate: requestData.requestedDate,
                    status: 'pending'
                };
                
                return { data: newRequest };
            },
            invalidatesTags: ['PositionTransfer', 'UserProfile'],
        }),
        
        // Get position transfer requests
        getTransferRequests: builder.query<PositionTransferRequest[], string>({
            queryFn: async (userId) => {
                const requests = getTransferRequests(userId);
                return { data: requests };
            },
            providesTags: ['PositionTransfer'],
        }),
        
        // Update transfer request status
        updateTransferStatus: builder.mutation<PositionTransferRequest, { 
            requestId: string; 
            status: 'approved' | 'rejected' 
        }>({
            queryFn: async ({ requestId, status }) => {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Find and update the request
                const allRequests = mockUserProfiles.flatMap(profile => 
                    getTransferRequests(profile.userId)
                );
                const request = allRequests.find(req => req.id === requestId);
                
                if (!request) {
                    return { error: { status: 404, data: 'Transfer request not found' } };
                }
                
                const updatedRequest = { ...request, status };
                return { data: updatedRequest };
            },
            invalidatesTags: ['PositionTransfer', 'UserProfile'],
        }),
        
        // Add career history
        addCareerHistory: builder.mutation<CareerHistory, { 
            userId: string; 
            history: Omit<CareerHistory, 'id'> 
        }>({
            queryFn: async ({ userId, history }) => {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const newHistory: CareerHistory = {
                    id: `history-${Date.now()}`,
                    ...history
                };
                
                return { data: newHistory };
            },
            invalidatesTags: ['UserProfile'],
        }),
    }),
});

export const { 
    useGetCareerPathQuery,
    useGetUserProfileQuery,
    useGetPositionsQuery,
    useGetPositionDetailsQuery,
    useCreateUserProfileMutation,
    useUpdateUserProfileMutation,
    useRequestPositionTransferMutation,
    useGetTransferRequestsQuery,
    useUpdateTransferStatusMutation,
    useAddCareerHistoryMutation
} = careerApi;
